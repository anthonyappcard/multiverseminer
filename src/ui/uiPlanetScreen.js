require(["uicomponent", "uiinventory", "uiselection", "game"]);

UIPlanetScreen.prototype = new UIComponent();
UIPlanetScreen.prototype.$super = parent;
UIPlanetScreen.prototype.constructor = UIPlanetScreen;

function UIPlanetScreen() {
    this.id = 'planetScreen';

    this.parent = undefined;

    this.playerInventoryFilter = undefined;
    this.playerInventory = undefined;

    this.planetInventoryFilter = undefined;
    this.planetInventory = undefined;

    this.componentLeftPanel = undefined;
    this.componentRightPanel = undefined;

    this.componentPlayerInventory = undefined;
    this.componentCrafting = undefined;
    this.componentEmpire = undefined;
    this.componentStats = undefined;

    this.componentPlayerGear = undefined;
    this.componentPlayerShip = undefined;
    this.componentPlanet = undefined;

    this.componentPlanetDisplay = undefined;

    // ---------------------------------------------------------------------------
    // overrides
    // ---------------------------------------------------------------------------
    this.baseInit = this.init;
    this.baseUpdate = this.update;
    this.baseShow = this.show;
    this.baseHide = this.hide;

    // ---------------------------------------------------------------------------
    // main functions
    // ---------------------------------------------------------------------------
    this.init = function() {
        if ($("#playerInventoryFilter").text() == "SCAVENGE") {
            $("#decompButton").show();
        };
        this.baseInit();

        this.updateWhenNeededOnly = false;

        this.playerInventoryFilter = new UISelection('playerInventoryFilter');
        this.playerInventoryFilter.values = ItemCategory;
        this.playerInventoryFilter.callback = this.onPlayerInventoryFilterChanged;
        this.playerInventoryFilter.min = 1; // To avoid selecting undef
        this.playerInventoryFilter.init();
        this.playerInventoryFilter.setSelection(game.settings.selectedPlayerInventoryFilter);

        this.playerInventory = new UIInventory('playerInventorySlots', 50);
        this.playerInventory.setStorage(game.player.storage);
        this.playerInventory.itemContext = game.itemContexts.playerInventory;
        this.playerInventory.slotCount = 50;
        this.playerInventory.init();
        this.playerInventory.setCategory(game.settings.selectedPlayerInventoryFilter);

        this.planetInventoryFilter = new UISelection('planetInventoryFilter');
        this.planetInventoryFilter.values = ItemCategory;
        this.planetInventoryFilter.callback = this.onPlanetInventoryFilterChanged;
        this.planetInventoryFilter.min = 1; // To avoid selecting undef
        //console.log(this.planetInventoryFilter);
        this.planetInventoryFilter.init();
        this.planetInventoryFilter.setSelection(game.settings.selectedPlanetInventoryFilter);

        this.planetInventory = new UIInventory('planetInventorySlots', 50);
        this.planetInventory.itemContext = game.itemContexts.planetInventory;
        this.planetInventory.slotCount = 50;
        this.planetInventory.init();
        this.planetInventory.setCategory(game.settings.selectedPlanetInventoryFilter);

        this.componentLeftPanel = new UIComponent('panelPlanetLeft');
        this.componentLeftPanel.init();

        this.componentRightPanel = new UIComponent('panelPlanetRight');
        this.componentRightPanel.init();

        this.componentPlayerInventory = new UIComponent('playerInventoryPanel');
        this.componentPlayerInventory.init();
        this.componentPlayerInventory.updateCallback = this.updatePlayerInventoryPanel;

        this.componentCrafting = new UIComponent('playerCraftingPanel');
        this.componentCrafting.init();
        this.componentCrafting.updateCallback = this.updateCraftingPanel;
        this.updateCraftingPanel();

        this.componentEmpire = new UIComponent('empirePanel');
        this.componentEmpire.init();
        this.componentEmpire.updateCallback = this.updateEmpirePanel;

        this.componentStats = new UIComponent('statsPanel');
        this.componentStats.init();
        this.componentStats.updateCallback = this.updateStatsPanel;

        this.componentPlayerGear = new UIComponent('playerGearPanel');
        this.componentPlayerGear.itemContext = game.itemContexts.playerGear;
        this.componentPlayerGear.init();
        this.componentPlayerGear.updateCallback = this.updatePlayerGearPanel;

        this.componentPlayerShip = new UIComponent('playerShipPanel');
        this.componentPlayerShip.itemContext = game.itemContexts.playerShip;
        this.componentPlayerShip.init();
        this.componentPlayerShip.updateCallback = this.updateShipPanel;

        this.componentPlanet = new UIComponent('planetPanel');
        this.componentPlanet.itemContext = game.itemContexts.planetGear;
        this.componentPlanet.init();
        this.componentPlanet.updateCallback = this.updatePlanetPanel;

        this.componentPlanetDisplay = new UIComponent('planetDisplay');
        this.componentPlanetDisplay.init();
        this.componentPlanetDisplay.enabled = true;
        this.componentPlanetDisplay.updateCallback = this.updatePlanetDisplay;

        this.componentQuestsPanel = new UIComponent('questsPanel');
        this.componentQuestsPanel.init();
        this.componentQuestsPanel.enabled = true;
        this.componentQuestsPanel.updateCallback = this.updateQuestsDisplay;

        // Activate some defaults
        this.activatePlayerInventory();
        this.activatePlayerGear();
        if ($("#playerInventoryFilter").text() == "SCAVENGE") {
            $("#decompButton").show();
        };
    };

    this.update = function(currentTime) {
        if (!this.baseUpdate(currentTime)) {
            return false;
        };
        if ($("#playerInventoryFilter").text() == "SCAVENGE") {
            $("#decompButton").show();
        };
        // Check for gear changes
        if (game.player.gear.gearChanged) {
            this.componentPlayerGear.invalidate();
            game.player.gear.gearChanged = false;
        }

        // Check for inventory changes
        if (game.player.storage.getStorageChanged()) {
            this.playerInventory.invalidate();
            this.componentCrafting.invalidate();
            game.player.storage.setStorageChanged(false);
        }

        // Check for planet updates
        if (game.currentPlanet) {
            if (game.currentPlanet.storage.getStorageChanged()) {
                this.planetInventory.invalidate();
                game.currentPlanet.storage.setStorageChanged(false);
            }
        }

        // Check for planet change
        if (game.getPlanetChanged()) {
            this.planetInventory.setStorage(game.currentPlanet.storage);
            this.componentPlanetDisplay.invalidate();
            game.setPlanetChanged(false);

            // Temporary place to switch on / off the planet options
            if (game.currentPlanet.data.miningLootTableId) {
                $('#mineButton').show();
            } else {
                $('#mineButton').hide();
            }

            if (game.currentPlanet.data.gatherLootTableId) {
                $('#gatherButton').show();
            } else {
                $('#gatherButton').hide();
            }

            if (game.currentPlanet.data.scavengeLootTableId) {
                $('#scavengeButton').show();
            } else {
                $('#scavengeButton').hide();
            }
        }

        // Update the components
        this.playerInventoryFilter.update(currentTime);
        this.playerInventory.update(currentTime);

        this.planetInventoryFilter.update(currentTime);
        this.planetInventory.update(currentTime);

        this.componentPlayerInventory.update(currentTime);
        this.componentCrafting.update(currentTime);
        this.componentEmpire.update(currentTime);

        this.componentPlayerGear.update(currentTime);
        this.componentPlayerShip.update(currentTime);
        this.componentPlanet.update(currentTime);

        this.componentPlanetDisplay.update(currentTime);
    };

    this.show = function() {
        this.isVisible = true;
        this.mainDiv.show().animate({
            opacity: 1
        }, 500);
        this.componentLeftPanel.show("left");
        this.componentRightPanel.show("right");
        this.invalidate();
        game.clearItemContexts();
    };

    this.hide = function() {
        this.isVisible = false;
        this.mainDiv.animate({
            opacity: 0
        }, 500, function() {
            $(this).hide();
        });
        this.componentLeftPanel.hide("left");
        this.componentRightPanel.hide("right");

        game.clearItemContexts();
    };

    // ---------------------------------------------------------------------------
    // specific functions
    // ---------------------------------------------------------------------------
    this.updatePlayerInventoryPanel = function() {
        var self = ui.screenPlanet;

        //self.playerInventory.update(game.player.storage);
    };

    this.updatePlanetInventoryPanel = function() {
        var self = ui.screenPlanet;

        if (!game.currentPlanet) {
            return;
        }

        self.planetInventory.update(game.currentPlanet.storage);
    };

    this.updatePlayerGearPanel = function() {
        var self = ui.screenPlanet;
        var parent = $('#playerGearSlots');
        parent.empty();

        var gearSlots = game.player.gear.getSlots();
        for (var i = 0; i < gearSlots.length; i++) {
            var itemId = game.player.gear.getItemInSlot(gearSlots[i]);
            var slot = ui.buildGearSlot('playerGear', gearSlots[i], itemId, parent);
            slot.itemContext = self.componentPlayerGear.itemContext;
            parent.append(slot.getMainElement());
        }
    };

    this.buildCraftingTooltip = function(item) {
        content = "<div style='font-size: 9pt;'>";

        switch (item.category) {
            case "rawMaterial":
                if (item.craftCost) {
                    content = "<strong>" + item.name + "</strong><p>";
                    if (item.description) {
                        content += "<p><strong>Description: </strong>" + item.description + "</br>";
                    }
                    content += "<strong>Cost:</strong></br>";
                    for (cost in item.craftCost) {
                        content += "&nbsp;" + game.getItemName(cost) + " x " + item.craftCost[cost] + "</br>";
                    }
                }
                if (item.el) {
                    content += "<p><strong>Atomic Symbol: </strong>" + "</br>" + "&nbsp;" + item.el;
                }
                if (item.description) {
                    content += "<p><strong>Description: </strong>" + "</br>&nbsp;" + item.description + "</br>";
                }
                break;

            case "component":
                if (item.craftCost) {
                    content = "<strong>" + item.name + "</strong><p>";
                    content += "<strong>Cost:</strong></br>";
                    for (cost in item.craftCost) {
                        content += "&nbsp;" + game.getItemName(cost) + " x " + item.craftCost[cost] + "</br>";
                    }
                }
                if (item.description) {
                    content += "<p><strong>Description: </strong>" + "</br>&nbsp;" + item.description + "</br>";
                }
                break;
            case "spaceship":
                if (item.craftCost) {
                    content = "<strong>" + item.name + "</strong><p>";
                    content += "<strong>Cost:</strong></br>";
                    for (cost in item.craftCost) {
                        content += "&nbsp;" + game.getItemName(cost) + " x " + item.craftCost[cost] + "</br>";
                    }
                }
                if (item.description) {
                    content += "<p><strong>Description: </strong>" + "</br>&nbsp;" + item.description + "</br>";
                }

            case "miningGear":
                if (item.craftCost) {
                    content = "<strong>" + item.name + "</strong><p>";
                    content += "<strong>Cost:</strong></br>";
                    for (cost in item.craftCost) {
                        content += "&nbsp;" + game.getItemName(cost) + " x " + item.craftCost[cost] + "</br>";
                    }
                }
                if (item.description) {
                    content += "<p><strong>Description: </strong>" + "</br>&nbsp;" + item.description + "</br>";
                }
                content += "<p><strong>Stats:</strong></br>";
                content += "&nbsp;Accuracy: " + item.accuracy + "</br>";
                content += "&nbsp;Mining Luck: " + item.miningLuck + "</br>";
                content += "&nbsp;Loot Luck: " + item.lootLuck + "</br>";
                content += "&nbsp;Scavenge Luck: " + item.scavengeLuck + "</br>";
                break;

            case "gearMainHand":
                if (item.craftCost) {
                    content = "<strong>" + item.name + "</strong><p>";
                    content += "<strong>Cost:</strong></br>";
                    for (cost in item.craftCost) {
                        content += "&nbsp;" + game.getItemName(cost) + " x " + item.craftCost[cost] + "</br>";
                    }
                }
                if (item.description) {
                    content += "<p><strong>Description: </strong>" + "</br>&nbsp;" + item.description + "</br>";
                }
                content += "</br><strong>Stats:</strong></br>";
                content += "&nbsp;Strength: " + item.strength + "</br>";
                content += "&nbsp;Accuracy: " + item.accuracy + "</br>";
                content += "&nbsp;Defense: " + item.defense + "</br>";
                content += "&nbsp;Evasion: " + item.evasion + "</br>";
                content += "&nbsp;Attack Speed: " + item.attackSpeed + "</br>";
                content += "&nbsp;Ship Speed: " + item.shipSpeed + "</br>";
                content += "&nbsp;Health: " + item.health + "</br>";
                content += "&nbsp;Mining Luck: " + item.miningLuck + "</br>";
                content += "&nbsp;Scavenge Luck: " + item.scavengeLuck + "</br>";
                content += "&nbsp;Loot Luck: " + item.lootLuck + "</br>";
                content += "&nbsp;Counter: " + item.counter + "</br>";
                content += "&nbsp;Regeneration: " + item.regeneration + "</br>";
                content += "&nbsp;Resillience: " + item.resillience + "</br>";
                content += "&nbsp;Perception: " + item.perception + "</br>";
                content += "&nbsp;Experience: " + item.experience + "</br>";
                break;

            case "gearHead":
                if (item.craftCost) {
                    content = "<strong>" + item.name + "</strong><p>";
                    content += "<strong>Cost:</strong></br>";
                    for (cost in item.craftCost) {
                        content += "&nbsp;" + game.getItemName(cost) + " x " + item.craftCost[cost] + "</br>";
                    }
                }
                if (item.description) {
                    content += "<p><strong>Description: </strong>" + "</br>&nbsp;" + item.description + "</br>";
                }
                content += "</br><strong>Stats:</strong></br>";
                content += "&nbsp;Strength: " + item.strength + "</br>";
                content += "&nbsp;Accuracy: " + item.accuracy + "</br>";
                content += "&nbsp;Defense: " + item.defense + "</br>";
                content += "&nbsp;Evasion: " + item.evasion + "</br>";
                content += "&nbsp;Attack Speed: " + item.attackSpeed + "</br>";
                content += "&nbsp;Ship Speed: " + item.shipSpeed + "</br>";
                content += "&nbsp;Health: " + item.health + "</br>";
                content += "&nbsp;Mining Luck: " + item.miningLuck + "</br>";
                content += "&nbsp;Scavenge Luck: " + item.scavengeLuck + "</br>";
                content += "&nbsp;Loot Luck: " + item.lootLuck + "</br>";
                content += "&nbsp;Counter: " + item.counter + "</br>";
                content += "&nbsp;Regeneration: " + item.regeneration + "</br>";
                content += "&nbsp;Resillience: " + item.resillience + "</br>";
                content += "&nbsp;Perception: " + item.perception + "</br>";
                content += "&nbsp;Experience: " + item.experience + "</br>";
                break;

            case "gearLegs":
                if (item.craftCost) {
                    content = "<strong>" + item.name + "</strong><p>";
                    content += "<strong>Cost:</strong></br>";
                    for (cost in item.craftCost) {
                        content += "&nbsp;" + game.getItemName(cost) + " x " + item.craftCost[cost] + "</br>";
                    }
                }
                if (item.description) {
                    content += "<p><strong>Description: </strong>" + "</br>&nbsp;" + item.description + "</br>";
                }
                content += "</br><strong>Stats:</strong></br>";
                content += "&nbsp;Strength: " + item.strength + "</br>";
                content += "&nbsp;Accuracy: " + item.accuracy + "</br>";
                content += "&nbsp;Defense: " + item.defense + "</br>";
                content += "&nbsp;Evasion: " + item.evasion + "</br>";
                content += "&nbsp;Attack Speed: " + item.attackSpeed + "</br>";
                content += "&nbsp;Ship Speed: " + item.shipSpeed + "</br>";
                content += "&nbsp;Health: " + item.health + "</br>";
                content += "&nbsp;Mining Luck: " + item.miningLuck + "</br>";
                content += "&nbsp;Scavenge Luck: " + item.scavengeLuck + "</br>";
                content += "&nbsp;Loot Luck: " + item.lootLuck + "</br>";
                content += "&nbsp;Counter: " + item.counter + "</br>";
                content += "&nbsp;Regeneration: " + item.regeneration + "</br>";
                content += "&nbsp;Resillience: " + item.resillience + "</br>";
                content += "&nbsp;Perception: " + item.perception + "</br>";
                content += "&nbsp;Experience: " + item.experience + "</br>";
                break;

            case "gearFeet":
                if (item.craftCost) {
                    content = "<strong>" + item.name + "</strong><p>";
                    content += "<strong>Cost:</strong></br>";
                    for (cost in item.craftCost) {
                        content += "&nbsp;" + game.getItemName(cost) + " x " + item.craftCost[cost] + "</br>";
                    }
                }
                if (item.description) {
                    content += "<p><strong>Description: </strong>" + "</br>&nbsp;" + item.description + "</br>";
                }
                content += "</br><strong>Stats:</strong></br>";
                content += "&nbsp;Strength: " + item.strength + "</br>";
                content += "&nbsp;Accuracy: " + item.accuracy + "</br>";
                content += "&nbsp;Defense: " + item.defense + "</br>";
                content += "&nbsp;Evasion: " + item.evasion + "</br>";
                content += "&nbsp;Attack Speed: " + item.attackSpeed + "</br>";
                content += "&nbsp;Ship Speed: " + item.shipSpeed + "</br>";
                content += "&nbsp;Health: " + item.health + "</br>";
                content += "&nbsp;Mining Luck: " + item.miningLuck + "</br>";
                content += "&nbsp;Scavenge Luck: " + item.scavengeLuck + "</br>";
                content += "&nbsp;Loot Luck: " + item.lootLuck + "</br>";
                content += "&nbsp;Counter: " + item.counter + "</br>";
                content += "&nbsp;Regeneration: " + item.regeneration + "</br>";
                content += "&nbsp;Resillience: " + item.resillience + "</br>";
                content += "&nbsp;Perception: " + item.perception + "</br>";
                content += "&nbsp;Experience: " + item.experience + "</br>";
                break;

            case "gearBuilding":
                if (item.craftCost) {
                    content = "<strong>" + item.name + "</strong><p>";
                    content += "<strong>Cost:</strong></br>";
                    for (cost in item.craftCost) {
                        content += "&nbsp;" + game.getItemName(cost) + " x " + item.craftCost[cost] + "</br>";
                    }
                }
                if (item.description) {
                    content += "<p><strong>Description: </strong>" + item.description + "</br>";
                }
                content += "</br><strong>Stats:</strong></br>";
                content += "&nbsp;Mine: " + item.automine + "/s</br>";
                content += "&nbsp;Refine: " + item.autorefine + "/s</br>";
                content += "&nbsp;Gather: " + item.autogather + "/s</br>";
                content += "&nbsp;Scavenge: " + item.autoscavenge + "/s</br>";
                break;

        };
        content += "</div>";
        return content;
    };

    this.updateCraftingPanel = function() {
        var self = ui.screenPlanet;
        var parent = $('#playerCraftingContent');
        if (parent.html() !== "") {
            for (var key in ItemCategory) {
                var items = game.getItemsByCategory(key);
                if (!items || items.length <= 0) {
                    continue;
                }
                // TODO: Move this somewhere else and make it take other storages into account
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    if (item.id) {
                        var element = $('#craft_' + item.id);
                        var canCraft = null;
                        if (item.craftCost && game.player.storage.canAdd(item.id)) {
                            var cost = game.getCraftingCost(item.id, 1);
                            var quantity = game.itemDictionary[item.id].craftResult || 1;
                            var keys = Object.keys(cost);
                            for (var x = 0; x < keys.length; x++) {
                                var key = keys[x];
                                var n = game.player.storage.getItemCount(key) / cost[key]
                                if (canCraft == null || canCraft > n) {
                                    canCraft = n;
                                }
                            }
                        }
                        if (canCraft > 1.0) {
                            element.removeClass('craftDisabled').addClass('craftEnabled');
                            element.find(".craftingCount").html("("+canCraft.toFixed()+")");
                        } else {
                            element.addClass('craftDisabled');
                            element.find(".craftingCount").html("");
                        }
                    }
                }
            }
            // Skip re-building this for now
            return;
        }

        for (var key in ItemCategory) {
            // Todo: remove this when scavenging items no longer have craftCost as their attribute
            if (key === 'scavenge') {
                continue;
            }

            var items = game.getItemsByCategory(key);
            if (!items || items.length <= 0) {
                continue;
            }

            var craftableItems = [];
            for (var i = 0; i < items.length; i++) {
                if (items[i].craftCost && game.player.storage.canAdd(items[i].id)) {
                    craftableItems.push(items[i]);
                }
            }

            if (craftableItems.length <= 0) {
                continue;
            }

            var headerContent = $('<div/>');
            parent.append('<p>' + ItemCategory[key] + '</p>').append(headerContent);
            for (var i = 0; i < craftableItems.length; i++) {
                headerContent.append(self.buildCraftingEntry(craftableItems[i]));
                $("#craft_" + craftableItems[i].id).tooltipster({
                    content: self.buildCraftingTooltip(craftableItems[i]),
                    theme: 'tooltipster-punk',
                    contentAsHTML: true,
                    position: "bottom",
                    onlyOne: true,
                    interactiveTolerance: 10,
                    speed: 10
                });
            }
        }

        $("#playerCraftingContent").accordion({
            heightStyle: "content",
            collapsible: true,
            active: false
        });
        // $("#playerCraftingContent").accordion('option', 'active', activePage,);
    };

    this.updateEmpirePanel = function() {
        // Todo
        console.log("empire");
    };

    this.updateStatsPanel = function() {
        numberRegex = /^\d+$/;
        $('#statsContent').empty();
        numberRegex = /^\d+$/;
        var stats = game.player.stats;
        var x = [];
        var y = [];
        var myObj = game.settings.totalStats;
        numberRegex = /^\d+$/;
        for (var prop in myObj) {
            if (myObj.hasOwnProperty(prop) && prop !== 'key' && typeof myObj[prop] != 'function') {
                if (myObj[prop] == null) myObj[prop] = 0;
                x.push((prop + ': ' + myObj[prop] + '</br>'));
            }
        };
        for (var key in stats) {
            var value = stats[key];
            y.push((key) + ': ' + value + '</br>');
        };
        $('#statsContent').html("Player Stats:</br>");
        $('#statsContent').append(y);
        $('#statsContent').append('</br>Game Stats:</br>');
        $('#statsContent').append(x);
    };

    this.updateShipPanel = function() {
        // Todo
    };

    this.updatePlanetPanel = function() {
        var self = ui.screenPlanet;
        var parent = $('#planetBuildings');
        parent.empty();

        var gearSlots = game.currentPlanet.gear.getSlots();
        for (var i = 0; i < gearSlots.length; i++) {
            var itemId = game.currentPlanet.gear.getItemInSlot(gearSlots[i]);
            var slot = ui.buildGearSlot('planetBuildings', gearSlots[i], itemId, parent);
            slot.itemContext = self.componentPlanet.itemContext;
            parent.append(slot.getMainElement());
        }
    };

    this.updateQuestsDisplay = function() {
        // TODO
    };

    this.updatePlanetDisplay = function() {
        $('#planetDisplayBackground').empty();
        $('#planetDisplayNameText').empty();
        if (game.currentPlanet) {
            var background = game.currentPlanet.getBackground();
            if (background) {
                if (game.currentPlanet.getName() === "Earth") {
                    $('#planetDisplayBackground').append('<img class="planetImage" src="assets/images/bigEarth.png"/>');
                } else {
                    $('#planetDisplayBackground').append('<img class="planetImage" src="' + background + '"/>');
                }
            }
            $('#planetDisplayNameText').text(game.currentPlanet.getName().toUpperCase());
        }
    };

    this.onPlayerInventoryFilterChanged = function() {
        var self = ui.screenPlanet;
        var category = self.playerInventoryFilter.selection;
        game.settings.selectedPlayerInventoryFilter = category;
        self.playerInventory.setCategory(category);

        self.componentPlayerInventory.invalidate();
    };

    this.onPlanetInventoryFilterChanged = function() {
        var self = ui.screenPlanet;
        var category = self.planetInventoryFilter.selection;
        game.settings.selectedPlanetInventoryFilter = category;
        self.planetInventory.setCategory(category);
    };

    this.hideLeftSideComponents = function() {
        this.componentPlayerInventory.hide();
        this.componentEmpire.hide();
        this.componentStats.hide();
        game.clearItemContext(this.playerInventory.itemContext);
    };

    this.hideRightSideComponents = function() {
        this.componentPlayerGear.hide();
        this.componentPlayerShip.hide();
        this.componentPlanet.hide();
        this.componentCrafting.hide();

        game.clearItemContext(this.componentPlayerGear.itemContext);
        game.clearItemContext(this.componentPlayerShip.itemContext);
        game.clearItemContext(this.componentPlanet.itemContext);
        game.clearItemContext(this.planetInventory.itemContext);
    };

    this.activatePlayerInventory = function() {
        this.hideLeftSideComponents();
        this.componentPlayerInventory.show();

        game.setItemContext(this.playerInventory.itemContext);
    };

    this.activateCrafting = function() {
        this.hideRightSideComponents();
        this.componentCrafting.show();
    };

    this.activateQuests = function() {
        this.hideLeftSideComponents();
    };
    this.activateEmpire = function() {
        this.hideLeftSideComponents();
        this.componentEmpire.show();
    };

    this.activateStats = function() {
        this.hideLeftSideComponents();
        this.componentStats.show();
        $('#statsContent').empty();
        numberRegex = /^\d+$/;
        var stats = game.player.stats;
        var x = [];
        var y = [];
        var myObj = game.settings.totalStats;
        numberRegex = /^\d+$/;
        for (var prop in myObj) {
            if (myObj.hasOwnProperty(prop) && prop !== 'key' && typeof myObj[prop] != 'function') {
                if (myObj[prop] == null) myObj[prop] = 0;
                x.push((prop + ': ' + myObj[prop] + '</br>'));
            }
        };
        for (var key in stats) {
            var value = stats[key];
            y.push((key) + ': ' + value + '</br>');
        };
        $('#statsContent').html("Player Stats:</br>");
        $('#statsContent').append(y);
        $('#statsContent').append('</br>Game Stats:</br>');
        $('#statsContent').append(x);
    };

    this.activatePlayerGear = function() {
        this.hideRightSideComponents();
        this.componentPlayerGear.show();

        game.setItemContext(this.componentPlayerGear.itemContext);
    };

    this.activatePlayerShip = function() {
        this.hideRightSideComponents();
        this.componentPlayerShip.show();

        game.setItemContext(this.componentPlayerShip.itemContext);
    };

    this.activatePlanet = function() {
        this.hideRightSideComponents();
        this.componentPlanet.show();

        game.setItemContext(this.planetInventory.itemContext);
    };

    this.buildCraftingEntry = function(item) {
        var tooltipContent = ui.buildCraftingCostTooltip(item);
        var content = $('<div id="craft_' + item.id + '" class="craftingItemPanel" onclick="newCraftingModal(\'' + item.id + '\')" />');

        var icon = game.getDefaultItemIcon(item);
        if (item.icon) {
            icon = item.icon;
        }
        content.append('<image class="craftingIcon" src="' + sys.iconRoot + icon + '" />');
        content.append('<span class="craftingText">' + item.name + '</span> <span class="craftingCount"></span>').disableSelection();

        return content;
    };
}
