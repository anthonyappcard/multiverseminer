require(["uicomponent", "uiinventory", "uiselection", "game", "collapsable"]);

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
    this.componentQuestsPanel = undefined;

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
        this.baseInit();

        this.updateWhenNeededOnly = false;

        this.playerInventoryFilter = new UISelection('playerInventoryFilter');
        this.playerInventoryFilter.values = ItemCategory;
        this.playerInventoryFilter.callback = this.onPlayerInventoryFilterChanged;
        this.playerInventoryFilter.min = 1; // To avoid selecting undef
        this.playerInventoryFilter.init();
        this.playerInventoryFilter.setSelection(game.settings.selectedPlayerInventoryFilter);

        this.playerInventory = new UIInventory('playerInventorySlots', 56);
        this.playerInventory.setStorage(game.player.storage);
        this.playerInventory.itemContext = game.itemContexts.playerInventory;
        this.playerInventory.slotCount = 56;
        this.playerInventory.init();
        this.playerInventory.setCategory(game.settings.selectedPlayerInventoryFilter);

        this.planetInventoryFilter = new UISelection('planetInventoryFilter');
        this.planetInventoryFilter.values = ItemCategory;
        this.planetInventoryFilter.callback = this.onPlanetInventoryFilterChanged;
        this.planetInventoryFilter.min = 1; // To avoid selecting undef
        this.planetInventoryFilter.init();
        this.planetInventoryFilter.setSelection(game.settings.selectedPlanetInventoryFilter);

        this.planetInventory = new UIInventory('planetInventorySlots', 56);
        this.planetInventory.itemContext = game.itemContexts.planetInventory;
        this.planetInventory.slotCount = 56;
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
        this.componentQuestsPanel.updateCallback = this.updateQuestsDisplay;

        // Activate some defaults
        this.activatePlayerInventory();
        this.activatePlayerGear();
    };

    this.update = function(currentTime) {
        if (!this.baseUpdate(currentTime)) {
            return false;
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
        this.componentQuestsPanel.update(currentTime);
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
        var content = "<div style='font-size: 9pt;'>";

        switch (item.category) {
            /* Raw Materials */
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

                /* Components */
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

                /* Mining Gear */
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

                /* Head Gear */
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
					content += "&nbsp;Defense: " + item.defense + "</br>";
                break;

                /* Chest Gear */
            case "gearChest":
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
					content += "&nbsp;Defense: " + item.defense + "</br>";
                break;

                /* Main Hand */
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
					content += "&nbsp;Attack Speed: " + item.attackSpeed + "</br>";
                break;

                /* Leg Gear */
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
					content += "&nbsp;Defense: " + item.defense + "</br>";
                break;

                /* Foot Gear */
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
					content += "&nbsp;Defense: " + item.defense + "</br>";
                break;

            
			/* Buildings */
			case "gearBuilding":
                if (item.craftCost) {
                    content = "<strong>" + item.name + "</strong><p>";
                    if (item.description) {
                        content += "<p><strong>Description: </strong><br>&nbsp;" + item.description + "</br><br>";
                    }
                    content += "<strong>Cost:</strong></br>";
                    for (cost in item.craftCost) {
                        content += "&nbsp;" + game.getItemName(cost) + " x " + item.craftCost[cost] + "</br>";
                    }
                }
                if (item.id == "miningRig") {
                    content += "</br><strong>Stats:</strong></br>";
                    content += "&nbsp;Mining : " + item.automine + "/aps";
                }
                if (item.id == "refinery") {
                    content += "</br><strong>Stats:</strong></br>";
                    content += "&nbsp;Refining Rate: " + item.autorefine + "/aps";
                }
                if (item.id == "gatherStation") {
                    content += "</br><strong>Stats:</strong></br>";
                    content += "&nbsp;Gathering Rate: " + item.autogather + "/aps";
                }
                if (item.id == "scavengeStation") {
                    content += "</br><strong>Stats:</strong></br>";
                    content += "&nbsp;Scavenging Rate: " + item.autoscavenge + "/aps";
                }
                if (item.id == "crudeOilDrone") {
                    content += "</br><strong>Stats:</strong></br>";
                    var aMatch = item.statchange.match("(\\w+)\":([0-9.]+)");
                    content += "&nbsp;" + game.getItemName(aMatch[1]) + " +" + aMatch[2] + "&#37;";
                }
	            if (item.id == "ironDetector") {
                    content += "</br><strong>Stats:</strong></br>";
                    var aMatch = item.statchange.match("(\\w+)\":([0-9.]+)");
                    content += "&nbsp;" + game.getItemName(aMatch[1]) + " +" + aMatch[2] + "&#37;";
                }
	            if (item.id == "oilPump") {
                    content += "</br><strong>Stats:</strong></br>";
                    var aMatch = item.statchange.match("(\\w+)\":([0-9.]+)");
                    content += "&nbsp;" + game.getItemName(aMatch[1]) + " +" + aMatch[2] + "&#37;";
                }				
	            if (item.id == "carbonDetector") {
                    content += "</br><strong>Stats:</strong></br>";
                    var aMatch = item.statchange.match("(\\w+)\":([0-9.]+)");
                    content += "&nbsp;" + game.getItemName(aMatch[1]) + " +" + aMatch[2] + "&#37;";
                }                
				break;

                /* Spaceship */
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
                break;
        };
        content += "</div>";
        return content;
    };

    this.updateCraftingPanel = function() {
        function addTooltip(element, item) {
            element.tooltipster({
                content: self.buildCraftingTooltip(item),
                theme: 'tooltipster-punk',
                contentAsHTML: true,
                position: "bottom",
                onlyOne: true,
                interactiveTolerance: 10,
				offsetX: 0,
				offsetY: 0,
                speed: 10
            });
        }

        var self = ui.screenPlanet;
        var parent = $('#playerCraftingContent');
        //parent.append('<form class="filterform"><input class="filterinput" type="text" data-type="search"></input></form><br>');
        //parent.append('<form class="filterform"><input class="filterinput" type="text" data-type="search"></input></form><br>');
        if (parent.html() !== "") {
            var craftableContent = parent.children(":nth-child(2)"); // assuming child 1 is [Crafting] header
            for (var key in ItemCategory) {
                if (key == 'scavenge') continue;
                var items = game.getItemsByCategory(key);
                if (!items || items.length <= 0) {
                    continue;
                }
                // TODO: Move this somewhere else and make it take other storages into account
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    if (item.id) {
                        var maxCraftable = game.player.storage.getMaxCraftableItems(item.id);
                        if (maxCraftable > 0 && craftableContent.find(".craft_" + item.id).length == 0) {
                            var entry = self.buildCraftingEntry(item);
                            craftableContent.append(entry);
                            addTooltip(entry, item);
                        }
                        var element = $('.craft_' + item.id);
                        var jxMax = element.find(".craftMax");
							element.find(".craft1").css("visibility", maxCraftable >= 1 ? "visible" : "hidden");
							element.find(".craft10").css("visibility", maxCraftable >= 10 ? "visible" : "hidden");
							element.find(".craft100").css("visibility", maxCraftable >= 100 ? "visible" : "hidden");
                        if (maxCraftable > 0) {
                            element.removeClass('craftDisabled').addClass('craftEnabled');
                            jxMax.html(" x " + maxCraftable.toFixed() + " ");
                        } else {
                            element.addClass('craftDisabled');
                            jxMax.html("");
                        }
                        var qty = game.player.storage.getItemCount(item.id);
                        element.find(".craftingCount").html(qty > 0 ? (" (" + qty + ")") : "");
                    }
                }
                craftableContent.find(".craftDisabled").remove();
            }
            // Skip re-building this for now
            return;
        }
        parent.append('<p>Available</p>').append($('<div/>'));

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

			function countProperties(items) {
			var count = 0;
			for(var prop in items) {
				if(items.hasOwnProperty(prop))
					++count;
			}
			return count;
			}
			
            var headerContent = $('<div>');
            parent.append('<p>' + ItemCategory[key] + '&nbsp;(' + countProperties(items) +')</p>').append(headerContent);
            for (var i = 0; i < craftableItems.length; i++) {
                var entry = self.buildCraftingEntry(craftableItems[i]);
                headerContent.append(entry);
                addTooltip(entry, craftableItems[i]);
            }
        }
        $("#playerCraftingContent").accordion({
            heightStyle: "content",
            collapsible: true,
            active: false
        });
        input = $('.filterinput').prepend('<form id="formdiv"><input class="filterinput" type="text" data-type="search" /></form><br>').parent();
        $('.filterinput').on('input', function() {
            var a = $(this).val();
            if (a.length > 0) {
                var containing = $('.craftingItemPanel').filter(function() {
                    return $(this).text().toLowerCase().indexOf(a.toLowerCase()) + 1;
                }).slideDown();
                $('.craftingItemPanel').not(containing).slideUp();
            } else {
                $('.craftingItemPanel').slideDown();
            }
            return false;
        });
    };

    this.updateEmpirePanel = function() {
        // Todo
        console.log("empirePanel");
    };

    this.updateStatsPanel = function() {
        $("#statsContent").html("");
        var stats = game.player.stats;
        var x = [];
        var y = [];
        var myObj = game.settings.totalStats;
        Object.keys(myObj) .forEach(function (prop) {
          if (myObj.hasOwnProperty(prop) && prop !== 'key' && typeof myObj[prop] != 'function' && prop != 'id') {
            if (myObj[prop] == null) myObj[prop] = 0;
            x.push($('<div>') .append($('<tr>') .append($('<td>' + prop + '</td>')) .append('<td>' + myObj[prop] + '</td>')) .html());
          };
        });
        Object.keys(stats) .forEach(function (key) {
          var value = stats[key];
          if (isNaN(value)) {
              value = 0;
          };
          y.push($('<div>') .append($('<tr>') .append($('<td>' + key + '</td>')) .append('<td>' + value + '</td>')) .html());
        });
        var statsContent = $('#statsContent');
        var playerStats = $('<div class=\'statTable\'></div>');
        playerStats.append($('<table>') .append($('<tr>') .append($('<td>Player</td><td>#</td>'))) .append(y.join('')));
        statsContent.append(playerStats);
        var gameStats = $('<div class=\'statTable\'></div>');
        gameStats.append($('<table>') .append($('<tr>') .append($('<td>Game</td><td>#</td>'))) .append(x.join('')));
        statsContent.append(gameStats);
    };

    this.updateShipPanel = function() {
        // Todo
    };

    this.updatePlanetPanel = function() {
        console.log("PlanetPanel");
    };

    // Questing Section (650-704)	
    this.updateQuestsDisplay = function() {
        // TODO
        $('#questsContent').empty();
        for (var i = 0; i < game.QuestTable.length; i++) {
            var quest = game.QuestTable[i];
            var dom = $("<span class='questTitle'>" + quest.name + "</span><br>");
            var expandQuest = $("<span class='expandQuest'>Open</span>");
            if (quest.completed)
                dom.addClass('questCompleted');
            expandQuest.mousedown({
                'self': dom,
                'quest': quest
            }, function(a) {
                uiplanetscreen._buildTaskList(a.data.self, a.data.quest);
            });
            dom.append(expandQuest);
            $('#questsContent').append(dom);
        }
        $('#questsContent').disableSelection();
    };

    this._buildTaskList = function(dom, quest) {
        var taskList = $("#taskList");
        if (taskList)
            taskList.remove();
        var last = 0;
        var div = $("<div id='taskList'></div>");
        var ul = $("<ul class='taskList'></ul>");
        for (var i = 0; i < quest.tasks.length; i++) {
            var task = quest.tasks[i];
            var li = $("<li class='taskItem'>" + task.desc + "</li>");
            if (quest.ordered) {
                if (task.completed) {
                    last = i;
                    li.addClass("taskCompleted");
                } else if (i == (last + 1)) {
                    li.addClass("taskCurrent");
                } else {
                    li.addClass("taskUnavailable");
                }
            } else {
                if (task.completed)
                    li.addClass("taskCompleted");
                else
                    li.addClass("taskCurrent");
            }
            ul.append(li);
        }
        div.append("<div class='questDescription'>-&nbsp;" + quest.desc + "</div>");
        div.append(ul);
        div.dialog({
            modal: true
        });
    };

    this.activateQuests = function() {
        this.hideLeftSideComponents();
        this.componentQuestsPanel.show();
    };


    this.updatePlanetDisplay = function() {
        $('#planetDisplayBackground').empty();
        $('#planetDisplayNameText').empty();
        if (game.currentPlanet) {
            var background = game.currentPlanet.getBackground();
            if (background) {
                if (game.currentPlanet.getName() === "Earth") {
                    $('#planetDisplayBackground').append('<img class="planetBigEarth" src="assets/images/bigEarth.png"/>');
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
        this.componentQuestsPanel.hide();
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

    this.activateEmpire = function() {
        this.hideLeftSideComponents();
        this.componentEmpire.show();
    };

    this.activateStats = function() {
        $("#statsContent").html("");
        this.hideLeftSideComponents();
        this.componentStats.show();
        var stats = game.player.stats;
        var x = [];
        var y = [];
        var myObj = game.settings.totalStats;
        Object.keys(myObj) .forEach(function (prop) {
          if (myObj.hasOwnProperty(prop) && prop !== 'key' && typeof myObj[prop] != 'function' && prop != 'id') {
            if (myObj[prop] == null) myObj[prop] = 0;
            x.push($('<div>') .append($('<tr>') .append($('<td>' + prop + '</td>')) .append('<td>' + myObj[prop] + '</td>')) .html());
          };
        });
        Object.keys(stats) .forEach(function (key) {
          var value = stats[key];
          if (isNaN(value)) {
              value = 0;
          };
          y.push($('<div>') .append($('<tr>') .append($('<td>' + key + '</td>')) .append('<td>' + value + '</td>')) .html());
        });
        var statsContent = $('#statsContent');
        var playerStats = $('<div class=\'statTable\'></div>');
        playerStats.append($('<table>') .append($('<tr>') .append($('<td>Player Stat</td><td>#</td>'))) .append(y.join('')));
        statsContent.append(playerStats);
        var gameStats = $('<div class=\'statTable\'></div>');
        gameStats.append($('<table>') .append($('<tr>') .append($('<td>Game Actions</td><td>#</td>'))) .append(x.join('')));
        statsContent.append(gameStats);
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
        var content = $('<div id="craftitem" class="craft_' + item.id + ' craftingItemPanel"/>');

        var icon = game.getDefaultItemIcon(item);
        if (item.icon) {
            icon = item.icon;
        }
        content.append('<image class="craftingIcon" src="' + sys.iconRoot + icon + '" />');
        content.append('<span id="craftingText" class="craftingText">' + item.name + '</span>');
		content.append('<span class="craftingCount">Disabled</span><br>');
		content.append('<span class="craft1"   onclick="newCraft(\'' + item.id + '\',1);(arguments[0] || event || window.event).stopPropagation();">&nbsp;&nbsp;x1</span>');
		content.append('<span class="craft10"  onclick="newCraft(\'' + item.id + '\',10);(arguments[0] || event || window.event).stopPropagation();">&nbsp;&nbsp;x10</span>');
        content.append('<span class="craft100" onclick="newCraft(\'' + item.id + '\',100);(arguments[0] || event || window.event).stopPropagation();">&nbsp;&nbsp;x100</span>');
		// content.append('<span class="craftMax" onclick="newCraft(\'' + item.id + '\',\'max\');(arguments[0] || event || window.event).stopPropagation();"></span>');
        content.disableSelection();

        return content;
    };
}
