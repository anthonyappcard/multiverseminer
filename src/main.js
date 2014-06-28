require(["data/system", "data/items", "data/loot", "data/planets", "data/actors", "game", "ui", "jquery", "jqueryui", "enums", "custombox", "utils", "uiplanetscreen", "gamegear", "noty", "joyride", "toolbar", "contextmenu", "bulletin"]);

// Create components
var game = new Game();
var ui = new UI();
var uiplanetscreen = new UIPlanetScreen();

// Save before closing the page.
window.onbeforeunload = function() {
    game.save();
};
// Add hook for document ready
$(document).ready(onDocumentReady);

// Setup notifications
$.jGrowl.defaults.position = 'top-right';
$.jGrowl.defaults.animateOpen = {
    height: 'show'
};
$.jGrowl.defaults.life = 300;
$.jGrowl.defaults.pool = 1;

Number.prototype.formatNumber = function() {
    if (ui.numberFormatter) {
        return ui.numberFormatter(this).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return this;
};

// ---------------------------------------------------------------------------
// function hooks
// ---------------------------------------------------------------------------

function onDocumentReady() {
    //Initialize the audio
    $('#audioDig').trigger('load');
    $('#audioDigSuccess').trigger('load');

    //Initialize components
    game.init();
    ui.init();
    ui.bindKey("d", onMine);
    ui.bindKey("g", onGather);
    ui.bindKey("s", onScavenge);

    // Call one round of UI Updates
    ui.update();

    // Activate the default panels
    onActivatePlayerInventory();
    onActivatePlayerGear();

    // Set the update interval
    var interval = 1000 / 60;
    setInterval(function() {
        onUpdate();
    }, interval);
    //$('<div class=\'hide-left\'><button onclick=\'$("#leftCategory").toggle()\'>Hide Panel</button></div>').insertAfter('#leftCategoryContent');
    //var ws = $.WebSocket('ws://dev.multiverseminer.com:8080', null, {
    //    http: 'http://127.0.0.1:81/Lab/Websocket/Data/poll.php'
    //});
    //ws.onerror = function(e) {
    //    console.log('Error with WebSocket uid: ' + e.target.uid);
    //};
    //var pipe1;
    //// if connection is opened => start opening a pipe (multiplexing)
    //ws.onopen = function() {
    //  //
    //  pipe1 = ws.registerPipe('user/all', null, {
    //      onopen: function() {
    //          console.log('pipe1 (' + this.uid + ') connected!');
    //      },
    //      onmessage: function(e) {
    //          console.log('< pipe1 : ' + e.data);
    //      },
    //      onerror: function(e) {
    //          console.log('< pipe1 error : ' + e.data);
    //      },
    //      onclose: function() {
    //          console.log('pipe1 (' + pipe.uid + ') connection closed!');
    //      }
    //  });
    //};
    //$(document).on("contextmenu", ".hasMenu", function(e) {
    //    console.log(e.target.id);
    //    return false;
    //});
    $(document).contextmenu({
        delegate: ".hasMenu",
        preventSelect: true,
        autoTrigger: true,
        taphold: true,
        menu: [{
            title: "Info",
            action: function(event, ui) {
                var info = game.getItem($("div:last-child", ui.target).attr("id"));
                var itemName = info.name,
                    itemDescription = info.description,
                    dialogDiv = $("#itemInfo");

                dialogDiv.dialog({
                    title: "Item Info: " + itemName,
                    autoOpen: true
                });

                dialogDiv.html("<p>Name: " + itemName + "</p>");

                if (typeof itemDescription === undefined) {
                    itemDescription = "A mysterious item.";
                }

                dialogDiv.append("<p>Description: " + itemDescription + "</p>");
            }
        }, {
            title: "Equip / Unequip",
            action: function(event, ui) {
                //console.log(ui.target);
                var itemId = game.getItem($("div:last-child", ui.target).attr("id"));
                if (itemId.gearType === "building") {
                    if (game.currentPlanet.storage.hasItem(itemId.id)) {
                        game.currentPlanet.storage.removeItem(itemId.id);
                        game.player.storage.addItem(itemId.id);
                    } else {
                        game.currentPlanet.storage.addItem(itemId.id);
                        game.player.storage.removeItem(itemId.id);
                    }
                    game.currentPlanet._updateStats();
                    game.currentPlanet.update();
                } else {
                    if (game.player.canEquip(itemId.id)) {
                        game.player.equip(itemId.id);
                        game.player.update();
                    } else {
                        noty({
                            text: "You can't equip this item.",
                            timeout: 2000,
                            type: "notification"
                        });
                    }
                }
            }
        }, {
            title: "Decompose All",
            action: function(event, ui) {
                game.player.decomposeScavenged();
            }
        }]
    });
    $("#bulletin").bulletin();
    $("#solarsystem").dialog({
        autoOpen: false
    });
};

function selectClass(playerClass) {
    game.player.playerClass = playerClass;
    $("#class-pick").dialog("close");
    game.save();
};

function tutorial() {
    $('#joyRideTipContent').joyride({
        autoStart: true,
        postStepCallback: function(index, tip) {
            if (index == 2) {
                $(this).joyride('set_li', false, 1);
            }
        },
        modal: false,
        expose: true
    });
};

function onUpdate() {
    var currentTime = Date.now();
    game.update(currentTime);
    ui.update(currentTime);
};

function openNotifications() {
    $("#notification-list").dialog({
        close: function(event, ui) {
            localStorage.setItem('notification_count', 0);
            localStorage.setItem('notification_text', "");
        }
    });
};

function newCraft(itemId, quantity) {
    //console.log(itemId, quantity);
    if (itemId == undefined) {
        utils.logError("onCraft with no item specified.");
        return false;
    }
    if (quantity == undefined) {
        quantity = 1;
    };
    if (quantity == "max") quantity = game.player.storage.getMaxCrafts(itemId);
    //console.log("Final quantity: " + quantity);
    try {
        if (game.player.craft(itemId, quantity)) {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        console.log(e);
    };
};

function onCraft(what) {
    if (what == undefined) {
        utils.logError("onCraft with invalid target");
        return;
    }

    if (game.player.craft(what)) {
        ui.screenPlanet.componentCrafting.invalidate();
    }
};

function exportStorage() {
    // encode the data into base64
    base64 = window.btoa(JSON.stringify(localStorage));
    var x = base64;
    //console.log(x);

    $.modal('<p class="selectExportGame">' + x + '</p>', {
        opacity: 80,
        escClose: true,
        containerId: 'exportBox',
        focus: true,
        overlayCss: {
            backgroundColor: "#000"
        }
    });
};

function importStorage() {
    $.modal('<strong>Import a Saved Game</strong<br><br><textarea cols="47" rows="20" class="selectImportGame"></textarea>', {
        opacity: 80,
        escClose: true,
        containerId: 'importBox',
        focus: true,
        overlayCss: {
            backgroundColor: "#000"
        }
    });
}

function doImport() {
    $("input[type=input]").on("change", function() {
        if (confirm("Are you sure you put the correct value in the box?")) {
            localStorage.clear();
            localStorage.setItem(this.id, $(this).val());
            $("#importStorageModal").append("<p>Import successful</p> Refresh the page.");
        }
    });
};

function toggleAudio() {
    //pause playing
    if (!document.getElementById('audioDig').muted) {
        document.getElementById('audioDig').muted = true;
        document.getElementById('audioDigSuccess').muted = true;
        $("#audioDig").trigger('stop');
        $("#audioDigSuccess").trigger('stop');
        noty({
            text: "Audio muted.",
            type: "notification",
            timeout: 2000
        });
    } else {
        document.getElementById('audioDig').muted = false;
        document.getElementById('audioDigSuccess').muted = false;
        noty({
            text: "Audio unmuted.",
            type: "notification",
            timeout: 2000
        });
    }
};

function togglePopup() {
    //pause playing
    game.settings.togglePopups();
    if (!game.settings.showPopups) {
        noty({
            text: "Loot text disabled.",
            type: "information",
            timeout: 2000
        });
    } else {
        noty({
            text: "Loot text enabled.",
            type: "information",
            timeout: 2000
        });
    }
};

// Mining, Gathering, Scavenging Modals //

function goMining() {
    $("#miningModal").modal({
        opacity: 80,
        escClose: true,
        overlayClose: true,
        overlayCss: {
            backgroundColor: "#000"
        },
        containerId: 'miningBox'
    });
};

function goGathering() {
    $("#gatheringModal").modal({
        opacity: 80,
        escClose: true,
        overlayClose: true,
        overlayCss: {
            backgroundColor: "#000"
        },
        containerId: 'gatheringBox'
    });
};

function goScavenging() {
    $("#scavengingModal").modal({
        opacity: 80,
        escClose: true,
        overlayClose: true,
        overlayCss: {
            backgroundColor: "#000"
        },
        containerId: 'scavengingBox'
    });
};
// Mining, Gathering, Scavenging Modals End

function onMine() {
    if (!$("#miningModal").is(':visible')) goMining();
    if (game.playerDied > 0) return false;
    if (this.lastRun !== "undefined") {
        if (this.lastRun >= ~~new Date() / 1000 | 0) {
            return false;
        };
    };
    game.settings.addStat('manualDigCount');

    if ($("#leftCategory2").hasClass("genericButtonSelected")) uiplanetscreen.updateStatsPanel();

    if (game.player.mine()) {
        $('#audioDigSuccess').trigger('play');
    } else {
        $('#audioDig').trigger('play');
    }
    this.lastRun = ~~new Date() / 1000 | 0;
};

function onGather() {
    if (!$("#gatheringModal").is(':visible')) goGathering();
    if (game.playerDied > 0) return false;
    if (this.lastRun !== "undefined") {
        if (this.lastRun >= ~~new Date() / 1000 | 0) {
            return false;
        };
    };
    game.settings.addStat('manualGatherCount');
    if ($("#leftCategory2").hasClass("genericButtonSelected")) uiplanetscreen.updateStatsPanel();
    game.player.gather();
    this.lastRun = ~~new Date() / 1000 | 0;
};

function onScavenge() {
    if (!$("#goScavenging").is(':visible')) goScavenging();
    if (game.playerDied > 0 || game.currentPlanet.data.id != "1") {
        return false;
    };
    if (this.lastRun !== "undefined") {
        if (this.lastRun >= ~~new Date() / 1000 | 0) {
            return false;
        };
    };
    game.settings.addStat('manualScavengeCount');
    if ($("#leftCategory2").hasClass("genericButtonSelected")) uiplanetscreen.updateStatsPanel();
    game.player.scavenge();
    this.lastRun = ~~new Date() / 1000 | 0;
};

function onActivatePlayerInventory() {
    // select the button
    changeLeftCategoryButton(0);

    // disable and hide
    ui.screenPlanet.activatePlayerInventory();
}

function onActivateCrafting() {
    // select the button
    changeRightCategoryButton(3);

    ui.screenPlanet.activateCrafting();
};

function onActivateEmpire() {
    // select the button
    changeLeftCategoryButton(1);

    ui.screenPlanet.activateEmpire();
};

function onActivateStats() {
    // select the button
    changeLeftCategoryButton(2);

    ui.screenPlanet.activateStats();
};

function onActivateQuests() {
    changeLeftCategoryButton(3);
    ui.screenPlanet.activateQuests();
}

function onActivatePlayerGear() {
    // select the button
    changeRightCategoryButton(0);

    ui.screenPlanet.activatePlayerGear();
};

function onActivateShip() {
    // select the button
    changeRightCategoryButton(1);

    ui.screenPlanet.activatePlayerShip();
};

function onActivatePlanet() {
    // select the button
    changeRightCategoryButton(2);

    ui.screenPlanet.activatePlanet();
};

function onMovePlanetItemsToPlayer() {
    game.movePlanetItemsToPlayer();
};

function onSave() {
    game.save();
    noty({
        text: "Game saved",
        type: "notification",
        timeout: 1500
    });
};

function onPlayerDied() {
    game.playerDied = new Date();
    $('#mineButton')[0].classList.add("hidden");
    $('#gatherButton')[0].classList.add("hidden");
    $('#scavengeButton')[0].classList.add("hidden");
    $('#fightButton')[0].classList.add("hidden");
};

function doReset() {
    game.wasReset = true;
    game.reset();
    onActivatePlayerInventory();
    onActivatePlayerGear();
};

function onTravelToPlanet(target) {
    if (!game.canTravelTo(target)) {
        return;
    }
    $("#solarsystem").dialog("close");
    $(".bulletin").hide();
    $(".panelBottom").hide();
    $(window).one("scroll", function() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    });
    ui.screenPlanet.hide();
    ui.screenTravel.show();
    game.travelTo(target);
    $(".panelBottom").show();
    $(".bulletin").show();
};

function onSetInventoryFilter(filter) {
    ui.inventoryPlayerCategoryFilter = filter;
    ui.updateComponent(ui.componentPlayerInventory);
}

function showFight() {
    if (game.playerDied > 0)
        return false;
    $("#fight-dialog").dialog({
        title: "Fight",
        minWidth: 350,
        minHeight: "auto"
    }).bind('dialogclose', function(event) {
        $("#fightText").val("");
        game.currentFight.disableFight();
    });
    game.currentFight = new Fight();
    game.currentFight.init();
}

function onReset() {
    $("#resetModal").modal({
        opacity: 80,
        escClose: true,
        overlayClose: true,
        overlayCss: {
            backgroundColor: "#000"
        },
        containerId: 'resetDialog'
    });
}

function changeLeftCategoryButton(selected) {
    for (var i = 0; i < 4; i++) {
        var name = document.getElementById("leftCategory" + i);
        name.className = "genericButton categoryButton clickable";
    }

    var name = document.getElementById("leftCategory" + selected);
    name.className = "genericButtonSelected categoryButton clickable";
}

function changeRightCategoryButton(selected) {
    for (var i = 0; i < 4; i++) {
        var name = document.getElementById("rightCategory" + i);
        name.className = "genericButton categoryButton clickable";
    }

    var name = document.getElementById("rightCategory" + selected);
    name.className = "genericButtonSelected categoryButton clickable";
}
// Old events code.
//$(function() {
//    var channel = pusher.subscribe('updates');
//    var notifier = new PusherNotifier(channel);
//    channel.bind('update', function(data) {
//        if (localStorage.getItem("notification_text") == "You have no notifications.") {
//            var notificationText = localStorage.setItem("notification_text", "Notifications: <br>");
//        };
//        localStorage.setItem("notification_count", ++notificationCount);
//        localStorage.setItem("notification_text", notificationText += "<br>" + data.message);
//        $("#new-message-count").text(notification_count);
//        $("#notification-list").text(notification_text);
//    });
//});

// Select class.
//$("#class1").click(function() {
//    selectClass(1);
//});
//$("#class2").click(function() {
//    selectClass(2);
//});
//$("#class3").click(function() {
//    selectClass(3);
//});
