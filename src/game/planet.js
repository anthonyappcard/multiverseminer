require(["gameminer", "gamestorage", "gamegear", "uiplanetscreen"]);

function Planet(data) {
    this.data = data;
    this.miner = new Miner('planet' + data.id);
    this.storage = new Storage('planet' + data.id);

    this.lastAutoTime = Date.now();
    this.autoMinePerSecond = 0;
    this.autoMineValue = 0;
    this.autoMine = false;

    this.autogatherPerSecond = 0;
    this.autogatherValue = 0;
    this.autogather = false;

    this.autoscavengePerSecond = 0;
    this.autoscavengeValue = 0;
    this.autoscavenge = false;
    
    this.autorefinePerSecond = 0;
    this.autorefineValue = 0;
    this.autorefine = false;
    
    this.autoProduce = false;
    this.autoProduceItems = [];

    // ---------------------------------------------------------------------------
    // general
    // ---------------------------------------------------------------------------
    this.initialize = function() {
        this.miner.initialize();
        this.storage.initialize();
        this._updateStats();
    };

    this.update = function(currentTime) {
        this.miner.update(currentTime);
        
        var elapsedTime = currentTime - this.lastAutoTime;
        var autoCycles = Math.floor(elapsedTime / 1000); // account for inactive tab
        
        for (var i = 0; i < autoCycles; i++) {
            this.lastAutoTime = currentTime;
            if (this.autoMine) {
                this.autoMineValue += this.autoMinePerSecond;
                if (this.autoMineValue >= 1) {

                    var attempts = Math.floor(this.autoMineValue);
                    this.autoMineValue -= attempts;
                    this._autoMine(attempts);
                }
            }

            if (this.autogather) {
                this.autogatherValue += this.autogatherPerSecond;
                if (this.autogatherValue >= 1) {
                    var attempts = Math.floor(this.autogatherValue);
                    this.autogatherValue -= attempts;
                    this._autogather(attempts);
                }
            }

            if (this.autoscavenge) {
                this.autoscavengeValue += this.autoscavengePerSecond;
                if (this.autoscavengeValue >= 1) {
                    var attempts = Math.floor(this.autoscavengeValue);
                    this.autoscavengeValue -= attempts;
                    this._autoscavenge(attempts);
                }
            }
            
            if (this.autorefine) {
                this.autorefineValue += this.autorefinePerSecond;
                if (this.autorefineValue >= 1) {
                    this.autorefineValue -= attempts;
                    this._autorefine(attempts);
                }
            }
            
            if (this.autoProduce) {
                this._autoProduce();
            }
        }
    };

    this.equip = function(itemId) {
        console.log(itemId);
        if (!itemId || (!this.storage.hasItem(itemId) && !game.player.storage.hasItem(itemId))) {
            utils.logError("Unable to equip item, invalid or don't have it");
            return;
        }

        if(this.storage.getItemCount(itemId) > (game.getItem(itemId).planetlimit || 1)) {
            game.moveItems(itemId, this.storage, game.player.storage, this.storage.getItemCount(itemId) - (game.getItem(itemId).planetlimit || 1));
        }
        
        this._updateStats();
        this.update();
        if (game.getItem(itemId).category == "rawMaterial") {
            noty({text: game.getItem(itemId).name + " moved to other storage.",type: "notification",timeout: 1500});
        } else {
            noty({text: game.getItem(itemId).name + " equipped",type: "notification",timeout: 1500});
        };
    };

    this.unEquip = function(itemId) {
        game.moveItems(itemId, this.storage, game.player.storage, 1);
        this._updateStats();
    };

    // ---------------------------------------------------------------------------
    // planet functions
    // ---------------------------------------------------------------------------
    this.getGatherLootTableId = function() {
        return this.data.gatherLootTableId;
    };

    this.getMiningLootTableId = function() {
        return this.data.miningLootTableId;
    };

    this.getName = function() {
        return this.data.name;
    };

    this.getBackground = function() {
        return this.data.background;
    };

    // ---------------------------------------------------------------------------
    // internal functions
    // ---------------------------------------------------------------------------
    this._updateStats = function() {
        // Reset the stats, this will have to move
        this.autoMinePerSecond = 0;
        this.autoMineValue = 0;
        this.autoMine = false;

        this.autogatherPerSecond = 0;
        this.autogatherValue = 0;
        this.autogather = false;

        this.autoscavengePerSecond = 0;
        this.autoscavengeValue = 0;
        this.autoscavenge = false;
        
        this.autorefinePerSecond = 0;
        this.autorefineValue = 0;
        this.autorefine = false;
        
        this.autoProduce = false;
        this.autoProduceItems = {};

        var items = this.storage.getItemsOfCategory('gearBuilding');
        if (!items) {
            return;
        }

        for (var i = 0; i < items.length; i++) {
            var item = game.getItem(items[i]);
            
            if(item.autoproduce) {
                this.autoProduce = true;
                // I think the line below this will be wrong.
                this.autoProduceItems = [];
                this.autoProduceItems.push(item.autoproduce);
            }
            
            if (item.automine) {
                this.autoMinePerSecond += item.automine * this.storage.getItemCount(item.id);
                this.autoMine = true;
                // Temporary cap at 10 / s
                if (this.autoMinePerSecond > 10) {
                    this.autoMinePerSecond = 10;
                }

            }

            if (item.autogather) {
                this.autogatherPerSecond += item.autogather * this.storage.getItemCount(item.id);
                this.autogather = true;
                // Temporary cap at 10 / s
                if (this.autogatherPerSecond > 10) {
                    this.autogatherPerSecond = 10;
                }
            }

            if (item.autoscavenge) {
                this.autoscavengePerSecond += item.autoscavenge * this.storage.getItemCount(item.id);
                this.autoscavenge = true;
                // Temporary cap at 5 / s
                if (this.autoscavengePerSecond > 5) {
                    this.autoscavengePerSecond = 5;
                }
            }
            if (item.autorefine) {
                this.autorefinePerSecond += item.autorefine * this.storage.getItemCount(item.id);
                this.autorefine = true;
                // Temporary cap at 5 / s
                if (this.autorefine > 5) {
                    this.autorefinePerSecond = 5;
                }
            }
        };
    };
    
    this._autoMine = function(attempts) {
        if (attempts > 100) {
            throw new Error("Way too many auto attempts pending, check the timer code!");
        }

        var totalItems = [];
        for (var i = 0; i < attempts; i++) {
            game.settings.addStat('autoDigCount');
            var items = this.miner.mine(this);
            if (items) {
                totalItems = $.merge(totalItems, items);
            }
        }

        if (totalItems.length <= 0) {
            return;
        }

        this._finalizeAuto(totalItems);
    };

    this._autogather = function(attempts) {
        if (attempts > 100) {
            throw new Error("Way too many auto attempts pending, check the timer code!");
        }
        game.settings.addStat('autogatherCount');
        var totalItems = [];
        for (var i = 0; i < attempts; i++) {
            var items = this.miner.gather(this);
            if (items) {
                totalItems = $.merge(totalItems, items);
            }
        }

        if (totalItems.length <= 0) {
            return;
        }

        this._finalizeAuto(totalItems);
    };

    this._autoscavenge = function(attempts) {
        if (attempts > 100) {
            throw new Error("Way too many auto attempts pending, check the timer code!");
        }
        game.settings.addStat('autoscavengeCount');
        var totalItems = [];
        for (var i = 0; i < attempts; i++) {
            var items = this.miner.scavenge(this);
            if (items) {
                totalItems = $.merge(totalItems, items);
            }
        }

        if (totalItems.length <= 0) {
            return;
        }

        this._finalizeAuto(totalItems);
    };
    
    this._autorefine = function(attempts) {
        if (attempts > 100) {
            throw new Error("Way too many auto attempts pending, check the timer code!");
        }
        game.settings.addStat('autorefineCount');
        if ($("#leftCategory2").hasClass("genericButtonSelected")) {
            uiplanetscreen.updateStatsPanel();
        }
        if (this.storage.getItemsOfCategory("scavenge")) {
            items = this.storage.getItemsOfCategory("scavenge");
            var rand = items[Math.floor(Math.random() * items.length)];
                game.currentPlanet.storage.removeItem(rand);
                game.player.storage.addItem(rand);
            }
    };
    
    var ticker = setInterval(function() {
        this._autoProduce;
    }, 1000);
    
    this._autoProduce = function() {
        this.addItem(this.autoProduceItems);
        game.settings.addStat("autoProduceCount");
    };
    
    this._finalizeAuto = function(totalItems) {
        this.storage.addItems(totalItems);
        uiplanetscreen.updateStatsPanel();
        if (game.currentPlanet != this) {
            return;
        }
        
        if(!game.settings.showPopups) return;
        
        var items = {};
        for (var i = 0; i < totalItems.length; i++) {
            if (!items[totalItems[i]]) {
                items[totalItems[i]] = 0;
            }

            items[totalItems[i]]++;
        }

        for (item in items) {
            var name = game.getItemName(item);
            ui.createFloat('+' + items[item] + ' ' + name, 'lootFloating', utils.getRandomInt(-100, 100), utils.getRandomInt(-100, 0));
        }
    };

    // ---------------------------------------------------------------------------
    // loading / saving / reset
    // ---------------------------------------------------------------------------
    this.getStorageKey = function() {
        return 'planet' + this.data.id + '_';
    };

    this.save = function() {
        this.miner.save();
        this.storage.save();
    };

    this.load = function() {
        this.miner.load();
        this.storage.load();
        this._updateStats();
    };

    this.reset = function() {
        this.miner.reset();
        this.storage.reset();
        this._updateStats();
    };
}
