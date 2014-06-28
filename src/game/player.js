require(["game", "gameminer", "gamecombatant", "gamestorage", "ui", "uiplanetscreen", "gamesettings", "noty", "simplemodal"]);

function Player() {
    this.id = 'player';
    this.pickPower = 1;
    this.miningLuck = 1;
    //this.totalPower = 1;
    this.miner = new Miner('player');
    this.storage = new Storage('player');
    this.gear = new Gear('player');
    this.stats = null;
    this.combatant = new Combatant({
        id: 'player',
        npc: false,
        player: this,
        name: "you"
    });
    this.playerClass = null;

    this.oxygenConsumption = 1;
    this.canBreathe = true;
    this.lastOxygenConsumption = Date.now();

    // ---------------------------------------------------------------------------
    // general
    // ---------------------------------------------------------------------------
    this.initialize = function() {
        this.miner.initialize();
        this.combatant.initialize();
        this.storage.initialize();
        this.gear.initialize();

        // Add the slots we can wear
        this.gear.addSlot('head');
        this.gear.addSlot('chest');
        this.gear.addSlot('mainHand');
        this.gear.addSlot('secondHand');
        this.gear.addSlot('legs');
        this.gear.addSlot('feet');
        this.gear.addSlot('miningGear');
        this.totalPower = this.calculatePower();
    };

    this.calculatePower = function() {
        this.pickPower = this.gear.getStats()["power"] || 1;
        this.miningLuck = this.gear.getStats()["miningLuck"] || 1;
        this.totalPower = this.pickPower * this.miningLuck;
        return this.totalPower;
    };

    this.update = function(currentTime) {
        this.miner.update(currentTime);
        this.combatant.update(currentTime);
        this.stats = this.gear.getStats();
        this.checkPlanet();
        this.totalPower = this.calculatePower();

        if (!this.canBreathe) {
            if (currentTime - this.lastOxygenConsumption > 1000) {
                // TODO: need to do something when this runs out
                if (this.storage.getItemCount(Items.oxygen.id) > 0) {
                    this.storage.removeItem(Items.oxygen.id);
                }
                this.lastOxygenConsumption = currentTime;
            }
        }
    };

    // ---------------------------------------------------------------------------
    // player functions
    // ---------------------------------------------------------------------------	
    this.mine = function() {
        if (!game.currentPlanet) {
            return false;
        };
        $("#miningActionText").html("You enter the mine.");
        var items = this.miner.mine(game.currentPlanet, this.pickPower, this.miningLuck);
        if (items.length > 0) {
            console.log("this.mine: items = " + items);
            if (game.settings.showPopups) {
                for (var i = 0; i < items.length; i++) {
                    var name = game.getItemName(items[i]);
                    var _float = ui.createFloat('+1 ' + name, 'lootFloating', utils.getRandomInt(-100, 100), utils.getRandomInt(-100, 0));
                }
            }
            // TODO - Add stat for whatever items you found.

            var questProgress = {};
            for (var i = 0; i < items.length; i++) {
                questProgress[items[i]] = questProgress[items[i]] ? (questProgress[items[i]] + 1) : 1;
            }
            for (var name in questProgress) {
                game.questProgress('mine', questProgress[name] + " " + name);
                this.storage.addItem(name, questProgress[name]);
            }
            var results = items;
            if (results.length > 1) {
                x = [];
                for (var i = 0; i < results.length; i++) {
                    x.push(game.getItemName(results[i]));
                };
                $("#miningResultsText").html("You take a rest, having found:<br>" + x.sort().join(', ') + ".");
            } else {
                $("#miningResultsText").html("You take a rest, having found:<br>" + game.getItemName(items) + ".");
            }
            return true;
        } else {
            resultsNothingChoices = [
                'You lose your grip on the pickaxe, and it goes flying.',
                'You\'ve unearthered nothing of value.'
            ];
            var choice = resultsNothingChoices[Math.floor(Math.random() * resultsNothingChoices.length)];
            $("#miningResultsText").html(choice);
        };
        return false;
    };

    this.gather = function() {
        if (!game.currentPlanet) {
            return false;
        }
        $("#gatheringActionText").html("You power on your atmospheric concentrator.");
        var items = this.miner.gather(game.currentPlanet);
        if (items.length > 0) {
            var results = items;
            if (results.length > 1) {
                x = [];
                for (var i = 0; i < results.length; i++) {
                    x.push(game.getItemName(results[i]));
                };
                $('#gatheringResultsText').html('After a cycle, the machine powers down and you collect:<br>' + x.sort().join(', ') + ".");
            } else {
                $('#gatheringResultsText').html('After a cycle, the machine powers down and you collect:<br>' + game.getItemName(items) + ".");
            }
            this.storage.addItems(items);
            return true;
        } else {
            resultsNothingChoices = [
                "There was a kink in the cog; your machine shut off prematurely.",
                "The battery light comes on, and the machine shuts off. You smack the machine and it goes back on."
            ];
            var choice = resultsNothingChoices[Math.floor(Math.random() * resultsNothingChoices.length)];
            $("#gatheringResultsText").html(choice);
        };
        return false;
    };

    this.generateActionText = function() {
        choices = [
            "house",
            "office",
            "pizzaria",
            "store",
            "van",
            "supermarket"
        ];
        var choice = choices[Math.floor(Math.random() * choices.length)];
        return choice;
    };
    
    this.cap = function(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    
    this.scavenge = function() {
        if (!game.currentPlanet) {
            return false;
        }
        // TODO - Add stat for whatever items you found.
        actionText = this.generateActionText();
        actionTextUpper = this.cap(actionText);
        $("#scavengingActionText").html('Location: ' + actionTextUpper);
        var items = this.miner.scavenge(game.currentPlanet);
        if (items.length > 0) {
            var results = items;
            if (results.length > 1) {
                x = [];
                for (var i = 0; i < results.length; i++) {
                    x.push(game.getItemName(results[i]));
                };
                $('#scavengingResultsText').html('After a thorough inspection of the ' + actionText + ' you return home with: <br>' + x.sort().join(', ') + ".");
            } else {
                $('#scavengingResultsText').html('After a thorough inspection of the ' + actionText + ' you return home with: <br>' + game.getItemName(items) + ".");
            }
            this.storage.addItems(items);
            return true;
        } else {
            resultsNothingChoices = [
                "a loud noise spooks you.<br>You run away empty handed.",
                "after thorough examination,<br>you determine there is nothing useful.<br>You go home empty-handed."
            ];
            var choice = resultsNothingChoices[Math.floor(Math.random() * resultsNothingChoices.length)];
            $("#scavengingResultsText").html('You enter the ' + actionText + ', but ' + choice);
        };
        return false;
    };

    this.decompose = function(item) {
        itemId = item.id;
        item = game.getItem(itemId).craftCost;
        for (var key in item) {
            if (item.hasOwnProperty(key)) {
                this.storage.addItem(key, item[key]);
            }
        }
        this.storage.removeItem(itemId);
    };

    this.decomposeScavenged = function() {
        // Decomposing scavenged items
        // TODO - Add stat for whatever items you found.
        if (!this.storage.getItemsOfCategory("scavenge")) {
            return noty({
                text: "You don't have anything to decompose.",
                type: "information",
                timeout: 3500
            });
        }
        var tmpItems = this.storage.getItemsOfCategory("scavenge");
        var scavengedItems = [];
        var gained = {};
        var removed = {};

        for (var i = 0; i < tmpItems.length; i++) {
            scavengedItems.push([game.getItem(tmpItems[i]), this.storage.items[tmpItems[i]]]);
        }
        if (!scavengedItems) {
            return;
        }

        for (var i = 0; i < scavengedItems.length; i++) {
            var item = scavengedItems[i][0];
            var count = scavengedItems[i][1]; //how many of each item being decomposed
            for (var key in item.craftCost) {
                this.storage.addItem(key, item.craftCost[key] * count);
                gained[key] = gained[key] ? gained[key] + item.craftCost[key] * count : item.craftCost[key] * count;
            }
            removed[item.id] = removed[item.id] ? removed[item.id] + count : count;
            this.storage.removeItem(item.id, count);
        }

        var gainedString = "<strong>Gained:</strong><br> ";
        for (var key in gained) {
            gainedString += game.getItem(key).name + " x " + gained[key] + ", ";
        }
        gainedString.substring(0, gainedString.length - 2);

        var removedString = "<br><br><strong>Lost:</strong><br>";
        for (var key in removed) {
            removedString += game.getItem(key).name + " x " + removed[key] + ", ";
        }
        removedString = removedString.substring(0, removedString.length - 2);
        gainedString = gainedString.substring(0, gainedString.length - 2);
        $('#decompModal').modal({
            opacity: 80,
            escClose: true,
            overlayClose: true,
            overlayCss: {
                backgroundColor: "#000"
            },
            containerId: 'decompBox'
        });
        $("#decompModal").append(gainedString + "" + removedString + "");
        delete scavengedItems;
    };

    this.craft = function(itemId, count) {
        // For now we craft with our inventory into our inventory
        try {
            if (game.craft(this.storage, this.storage, itemId, count));
            return true;
        } catch (err) {
            console.log(e);
            return false;
        }
        game.questProgress('craft', count + " " + itemId);

        //this.equipBestGear();

        return true;
    };

    this.checkPlanet = function() {
        if (game.currentPlanet != null) {
            if (game.currentPlanet.data.oxygen == true) {
                this.canBreathe = true;
            } else {
                this.canBreathe = false;
            }
        }
    };

    this.equip = function(itemId) {
        this.gear.equip(itemId, this.storage.getItemMetadata(itemId));
        this.storage.removeItem(itemId);
    };

    this.canEquip = function(itemId) {
        return this.gear.canEquip(itemId);
    };

    this.unEquip = function(type) {
        if (!this.hasEquipped(type)) {
            return;
        }
        var itemId = this.gear.getItemInSlot(type);
        this.gear.unEquip(type);
        game.player.storage.addItem(itemId);
        game.player.gear.gearChanged = true;
    };

    this.hasEquipped = function(type) {
        return this.gear.getItemInSlot(type) != undefined;
    };

    this.getTravelSpeed = function() {
        // TODO: hardcoded for now until ship is done
        return 5000;
    };

    // ---------------------------------------------------------------------------
    // loading / saving
    // ---------------------------------------------------------------------------
    this.save = function() {
        this.miner.save();
        this.combatant.save();
        this.storage.save();
        this.gear.save();
        localStorage.playerOxygenConsumption = this.oxygenConsumption;
        localStorage.planetID = game.currentPlanet.data.id;
        localStorage.playerClass = this.playerClass;
    };

    this.load = function() {
        this.miner.load();
        this.combatant.load();
        this.storage.load();
        this.gear.load();
        this.stats = this.gear.getStats();
        this.oxygenConsumption = utils.loadFloat('playerOxygenConsumption', 1);
        this.playerClass = utils.loadInt('playerClass', 1);
        game.currentPlanet = game.planets[utils.loadInt('planetID', 1)];
        game.planetChanged = true;
        this.totalPower = this.calculatePower();
    };

    this.reset = function(fullReset) {
        game.wasReset = true;
        $(window).off('onbeforeunload');
        this.miner.reset(fullReset);
        this.combatant.reset(fullReset);
        this.storage.reset(fullReset);
        this.gear.reset(fullReset);
        this.oxygenConsumption = 1;
        this.pickPower = 1;
        this.miningLuck = 1;
        this.baseMineSpeed = 1;
        this.playerClass = null;
        this.totalPower = 1;
        game.wasReset = false;
    };
}
