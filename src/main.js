require(["data/system", "data/items", "data/loot", "data/planets", "data/actors", "game", "ui", "jquery", "jqueryui", "enums", "custombox", "utils", "uiplanetscreen", "gamegear", "noty", "joyride", "toolbar", "ws", "contextmenu", "bulletin"]);

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
    $(document).contextmenu({
        delegate: ".hasMenu",
        preventSelect: true,
        autoTrigger: true,
        taphold: true,
        menu: [{
            title: "Info",
            action: function(event, ui) {
                info = game.getItem(ui.target.children().last().attr("id"));
                itemName = info.name;
                itemDescription = info.description;
                dialogDiv = $("#itemInfo");
                dialogDiv.dialog();
                dialogDiv.dialog("open");
                dialogDiv.html("Name: " + itemName + "<p>");
                if (typeof itemDescription === "undefined") {
                    dialogDiv.append("Description: A mysterious item.");
                } else {
                    dialogDiv.append("Description: " + itemDescription + "<p>");
                }
            }
        }, {
            title: "Equip / Unequip",
            action: function(event, ui) {
                itemId = game.getItem(ui.target.children().last().attr("id"));
                if (itemId.gearType == "building") {
                    if (game.currentPlanet.storage.hasItem(itemId.id)) {
                        game.currentPlanet.storage.removeItem(itemId.id);
                        game.player.storage.addItem(itemId.id);
                    } else {
                        game.currentPlanet.storage.addItem(itemId.id);
                        game.player.storage.removeItem(itemId.id);
                    }
                } else {
                    if (game.player.canEquip(itemId.id)) {
                        game.player.equip(itemId.id);
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

function onMine() {
    if (game.playerDied > 0)
        return false;
    game.settings.addStat('manualDigCount');
    if ($("#leftCategory2").hasClass("genericButtonSelected")) uiplanetscreen.updateStatsPanel();
    if (game.player.mine()) {
        $('#audioDigSuccess').trigger('play');
    } else {
        $('#audioDig').trigger('play');
    }
};

function exportStorage() {
    // encode the data into base64
    base64 = window.btoa(JSON.stringify(localStorage));
    var x = base64;
    // var link = 'data:application/octet-stream;base64,' + base64;
    // x.append("<a href=" + link + ">Download</a>");
    $.modal('<textarea style="height:394px;width:460px;" cols="59" rows="44" wrap="hard">' + x + '</textarea>', {
        opacity: 80,
        overlayCss: {
            backgroundColor: "#000"
        },
        escClose: true,
        containerId: 'exportBox',
        onShow: function() {
            $("body").css("overflow", "hidden");
            $(".simplemodal-container").css("width", "467px");
            $(".simplemodal-container").css("left", "582.5px");
            $(".simplemodal-container").css("display", "inline-block");
        },
        onClose: function() {
            $("body").css("overflow", "");
            $(".simplemodal-container").css("width", "410px");
            $(".simplemodal-container").css("left", "611px");
            $(".simplemodal-container").css("display", "block");            
            $.modal.close();
        }
    });
};
function importStorage() {
    $("#importStorageModal").dialog({
        modal: true
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

// Digging, Gathering, Scavenging Modals //
function goDigging() {
    $("#diggingModal").modal({
        opacity: 80,
        escClose: true,
        overlayClose: true,
        overlayCss: {
            backgroundColor: "#000"
        },
        containerId: 'diggingBox'
    });
};

function goGathering() {
    $("#gatherModal").modal({
        opacity: 80,
        escClose: true,
        overlayClose: true,
        overlayCss: {
            backgroundColor: "#000"
        },
        containerId: 'gatheringBox'
    });
};

function scavengeQuest() {
    $("#scavengeModal").modal({
        opacity: 80,
        escClose: true,
        overlayClose: true,
        overlayCss: {
            backgroundColor: "#000"
        },
        containerId: 'scavengeQuest'
    });
};
// Digging, Gathering, Scavenging Modals End

function onGather() {
    if (!$("#gatherModal").is(':visible')) goGathering();
    if (game.playerDied > 0) {
        return false;
    };
    if (this.lastRun !== "undefined") {
        if (this.lastRun >= ~~new Date() /1000|0) {
            return false;
        };
    };
    game.settings.addStat('manualGatherCount');
    if ($("#leftCategory2").hasClass("genericButtonSelected")) uiplanetscreen.updateStatsPanel();
    game.player.gather();
    this.lastRun = ~~new Date() /1000|0;
};

function onScavenge() {
    if (!$("#scavengeQuest").is(':visible')) scavengeQuest();
    if (game.playerDied > 0 || game.currentPlanet.data.id != "1") {
        return false;
    };
    if (this.lastRun !== "undefined") {
        if (this.lastRun >= ~~new Date() /1000|0) {
            return false;
        };
    };
    game.settings.addStat('manualScavengeCount');
    if ($("#leftCategory2").hasClass("genericButtonSelected")) uiplanetscreen.updateStatsPanel();
    game.player.scavenge();
    this.lastRun = ~~new Date() /1000|0;
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
    $(".panelBottom").hide();
    $(window).one("scroll", function() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    });
    ui.screenPlanet.hide();
    ui.screenTravel.show();
    game.travelTo(target);
    $(".panelBottom").show();
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
