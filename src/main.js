require(["data/system", "data/items", "data/loot", "data/planets", "data/actors", "game", "ui", "jquery", "jqueryui", "enums", "custombox", "utils", "uiplanetscreen", "gamegear", "noty", "joyride", "toolbar"]);

// Create components
var game = new Game();
var ui = new UI();
var uiplanetscreen = new UIPlanetScreen();

// Add hook for document ready
$(document).ready(onDocumentReady);

window.onbeforeunload = function() {
    game.save();
};

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

function selectClass(playerClass) {
    game.player.playerClass = playerClass;
    $("#class-pick").dialog("close");
    game.save();
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

    $("#class1").click(function() {
        selectClass(1);
    });
    $("#class2").click(function() {
        selectClass(2);
    });
    $("#class3").click(function() {
        selectClass(3);
    });
    var n = noty({
        text: "We're open source, and actively developing! <a href='http://github.com/antlong/multiverseminer' target='_blank'>Fork our repo.</a>",
        type: "information",
        timeout: 3500
    });
    $('#settings').toolbar({
        content: '#user-toolbar-options',
        position: 'top',
        hideOnClick: true
    });
};

function openSettings() {
    $('#settings').toolbar({
        content: '#user-toolbar-options',
        position: 'top',
        hideOnClick: true
    });
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

function newCraft(itemId, quantity) {
    if (itemId == undefined) {
        utils.logError("onCraft with no item specified.");
    }
    if (quantity == undefined) {
        quantity = 1;
    };
    if (quantity == "max") quantity = game.player.storage.getMaxCrafts(itemId);
    if (game.player.craft(itemId, quantity)) {
        ui.screenPlanet.componentCrafting.invalidate();
    }
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
    if ($("#leftCategory2").hasClass("genericButtonSelected"))
        uiplanetscreen.updateStatsPanel();
    if (game.player.mine()) {
        $('#audioDigSuccess').trigger('play');
    } else {
        $('#audioDig').trigger('play');
    }
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
            type: "information",
            timeout: 2000
        });
    } else {
        document.getElementById('audioDig').muted = false;
        document.getElementById('audioDigSuccess').muted = false;
        noty({
            text: "Audio unmuted.",
            type: "information",
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

function onGather() {
    if (game.playerDied > 0)
        return false;
    game.settings.addStat('manualGatherCount');
    if ($("#leftCategory2").hasClass("genericButtonSelected"))
        uiplanetscreen.updateStatsPanel();
    game.player.gather();
};

function onScavenge() {
    if (game.playerDied > 0)
        return false;
    game.settings.addStat('manualScavengeCount');
    if ($("#leftCategory2").hasClass("genericButtonSelected"))
        uiplanetscreen.updateStatsPanel();
    game.player.scavenge();
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
        text: "Game saved.",
        type: "information",
        timeout: 2000
    });
};

function onReset() {
    $.custombox( this, {
        overlay: false,
        effect: 'fadein'
    });
    e.preventDefault();
};

function onPlayerDied() {
    game.playerDied = new Date();
    $('#mineButton')[0].classList.add("hidden");
    $('#gatherButton')[0].classList.add("hidden");
    $('#scavengeButton')[0].classList.add("hidden");
    $('#fightButton')[0].classList.add("hidden");
};

function doReset() {
    game.player.reset();
    game.reset();
    onActivatePlayerInventory();
    onActivatePlayerGear();
};

function onTravelToPlanet(target) {
    if (!game.canTravelTo(target)) {
        return;
    }
    $("#solarsystem").dialog("close");
    $(window).one("scroll", function() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    });
    ui.screenPlanet.hide();
    ui.screenTravel.show();
    game.travelTo(target);
};

function onSetInventoryFilter(filter) {
    ui.inventoryPlayerCategoryFilter = filter;
    ui.updateComponent(ui.componentPlayerInventory);
}

function showChat() {
    $("#chat-modal").dialog({
        height: 500,
        maxHeight: 800,
        width: 500
    });
}

function newCraftingModal(itemId) {
    var maxCrafts = game.player.storage.getMaxCrafts(itemId);
    if (maxCrafts <= 5) {
        newCraft(itemId, 1);
        return;
    }
    var name = game.getItem(itemId).name;
    if (game.getItem(itemId).description) {
        var description = "Description: " + game.getItem(itemId).description;
        $("#item-description").val(description);
    }
    $("#new-crafting-modal").dialog({
        resizable: false,
        height: 300,
        modal: true,
        title: "Crafting: " + name,
        buttons: {
            'Craft It': function() {
                newCraft(itemId, $("#quantity").val());
            }
        }
    });
    $("#hidden-input").val(itemId);
    $("#item-description").css("display", "block");
    $("new-crating-modal").dialog('open');
};

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
