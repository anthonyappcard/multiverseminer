require(["gameminer", "gamestorage", "gamegear", "uiplanetscreen"]);
var uiplanetscreen = new UIPlanetScreen();

function Planet(data) {
    this.data = data;
    this.miner = new Miner('planet' + data.id);
    this.storage = new Storage('planet' + data.id);

    this.lastAutoTime = Date.now();
    this.autoMinePerSecond = 0;
    this.autoMineValue = 0;
    this.autoMine = false;

    this.autoGatherPerSecond = 0;
    this.autoGatherValue = 0;
    this.autoGather = false;

    this.autoScavengePerSecond = 0;
    this.autoScavengeValue = 0;
    this.autoScavenge = false;

    // ---------------------------------------------------------------------------
    // general
    // ---------------------------------------------------------------------------
    this.initialize = function() {
        if ($("#playerInventoryFilter").text() == "Scavenge") {
            $("#decompButton").show();
        }

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

            if (this.autoGather) {
                this.autoGatherValue += this.autoGatherPerSecond;
                if (this.autoGatherValue >= 1) {
                    var attempts = Math.floor(this.autoGatherValue);
                    this.autoGatherValue -= attempts;
                    this._autoGather(attempts);
                }
            }

            if (this.autoScavenge) {
                this.autoScavengeValue += this.autoScavengePerSecond;
                if (this.autoScavengeValue >= 1) {
                    var attempts = Math.floor(this.autoScavengeValue);
                    this.autoScavengeValue -= attempts;
                    this._autoScavenge(attempts);
                }
            }
        }
    };

    this.equip = function(itemId) {
        if (!itemId || (!this.storage.hasItem(itemId) && !game.player.storage.hasItem(itemId))) {
            utils.logError("Unable to equip item, invalid or don't have it");
            return;
        }

        if(this.storage.getItemCount(itemId) > (game.getItem(itemId).planetlimit || 1)) {
            game.moveItems(itemId, this.storage, game.player.storage, 1);
        } else {
            this._updateStats();
        }
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

        this.autoGatherPerSecond = 0;
        this.autoGatherValue = 0;
        this.autoGather = false;

        this.autoScavengePerSecond = 0;
        this.autoScavengeValue = 0;
        this.autoScavenge = false;

        var items = this.storage.getItemsOfCategory('gearBuilding');
        if (!items) {
            return;
        }

        for (var i = 0; i < items.length; i++) {
            var item = game.getItem(items[i]);
            if (item.automine) {
                this.autoMinePerSecond += item.automine * this.storage.getItemCount(item.id);
                this.autoMine = true;
                // Temporary cap at 10 / s
                if (this.autoMinePerSecond > 10) {
                    this.autoMinePerSecond = 10;
                }

            }

            if (item.autogather) {
                this.autoGatherPerSecond += item.autogather * this.storage.getItemCount(item.id);
                this.autoGather = true;
                // Temporary cap at 10 / s
                if (this.autoGatherPerSecond > 10) {
                    this.autoGatherPerSecond = 10;
                }
            }

            if (item.autoscavenge) {
                this.autoScavengePerSecond += item.autoscavenge * this.storage.getItemCount(item.id);
                this.autoScavenge = true;
                // Temporary cap at 5 / s
                if (this.autoScavengePerSecond > 5) {
                    this.autoScavengePerSecond = 5;
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

    this._autoGather = function(attempts) {
        if (attempts > 100) {
            throw new Error("Way too many auto attempts pending, check the timer code!");
        }
        game.settings.addStat('autoGatherCount');
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

    this._autoScavenge = function(attempts) {
        if (attempts > 100) {
            throw new Error("Way too many auto attempts pending, check the timer code!");
        }
        game.settings.addStat('autoScavengeCount');
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

    this._finalizeAuto = function(totalItems) {
        this.storage.addItems(totalItems);

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
