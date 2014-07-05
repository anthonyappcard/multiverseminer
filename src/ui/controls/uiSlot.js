require(["jquery", "tooltipster", "enums"]);
UISlot.prototype = new UIComponent();
UISlot.prototype.$super = parent;
UISlot.prototype.constructor = UISlot;

function UISlot(id, parent) {
    this.id = id;

    this.parent = parent;

    this.controlType = 'UISlot';
    this.classes = 'hasMenu itemSlot itemSlotNonHover';

    this.mainDiv = undefined;
    this.iconDisplay = undefined;
    this.countDisplay = undefined;

    this.isClear = true;

    this.displayZero = false;

    this.canDrag = true;
    this.canDrop = true;

    this.item = undefined;

    this.onClick = undefined;

    this.count = 0;

    // ---------------------------------------------------------------------------
    // overrides
    // ---------------------------------------------------------------------------
    this.baseInit = this.init;

    // ---------------------------------------------------------------------------
    // main functions
    // ---------------------------------------------------------------------------
    this.init = function() {
        this.baseInit();

        this.mainDiv.hover(
            function() {
                $(this).addClass("itemSlotHover");
                $(this).removeClass("itemSlotNonHover");
            },
            function() {
                $(this).addClass("itemSlotNonHover");
                $(this).removeClass("itemSlotHover");
            }
        );

        this.mainDiv.mousedown({
            self: this
        }, this.onMouseDown);
        this.mainDiv.mouseup({
            self: this
        }, this.onMouseUp);
        this.mainDiv.mouseover({
            self: this
        }, this.onMouseOver);
        this.mainDiv.dblclick({
            self: this
        }, this.onDoubleClick);
    };

    // ---------------------------------------------------------------------------
    // events
    // ---------------------------------------------------------------------------
    this.onMouseDown = function(parameters) {
        var self = parameters.data.self;

        // utils.log('SlotMouseDown: ' + parameters.which+" " + self.item, true);
        // If we don't have content don't do anything
        if (!self.item) {
            return;
        }

        if (self.onClick) {
            self.onClick(self);
        }

        if (!self.canDrag) {
            return;
        }

        ui.beginDrag(self);
    };

    this.onMouseUp = function(parameters) {
        var self = parameters.data.self;

        // If we don't have content don't do anything
        if (!self.item) {
            return;
        }

        // Right click to activate the item context action
        if (parameters.which == MouseButtons.right) {
            game.activateItemContext(self.item.id, self.itemContext);
        }
    };

    this.onMouseOver = function(parameters) {
        var self = parameters.data.self;
        if (!ui.isDragging) {
            return;
        }

        var tryDropResult = self.tryDrop(ui.getDragSource());
        if (tryDropResult) {
            ui.setDragTarget(self);
        } else {
            ui.setDragTarget(undefined);
        }
    };

    this.onDoubleClick = function(parameters) {
        var self = parameters.data.self;

        // If we don't have content don't do anything
        if (!self.item) {
            return;
        }

        game.useItemContext(self.item.id);
    };

    // ---------------------------------------------------------------------------
    // slot functions
    // ---------------------------------------------------------------------------
    this.getMainElement = function() {
        return this.mainDiv;
    };

    this.generateItemTooltip = function(item) {
        content = "<b>" + item.name + "</b></br>" + item.description + "<br><br>";
        content += "<i style='font-size: 10pt;'>" + ItemCategory[item.category] + "</i></br>";

        content += "<div style='font-size: 9pt;'>";

        switch (item.category) {
            case "rawMaterial":
                content = "<b>" + item.name + "</b></br>" + item.description +"<br><br>";
                content = "<b>" + item.name + "</b><br>";
                content += "Value: " + item.value;
                break;

            case "gem":
                content = "<b>" + item.name + "</b><br>";
                content += "Value: " + item.value;
                break;

            case "component":
                content = "<b>" + item.name + "</b>";
                break;

            case "miningGear":
                content = "<b>" + item.name + "</b><br>";
                content += "Accuracy: " + item.accuracy + "</br>";
                content += "Mining Luck: " + item.miningLuck + "</br>";
                content += "Loot Luck: " + item.lootLuck + "</br>";
                content += "Scavenge Luck: " + item.scavengeLuck + "</br>";
                break;

            case "gearMainHand":
                content = "<b>" + item.name + "</b><br>";
                content += "Strength: " + item.strength + "</br>";
                content += "Accuracy: " + item.accuracy + "</br>";
                content += "Defense: " + item.defense + "</br>";
                content += "Evasion: " + item.evasion + "</br>";
                break;

            case "gearSecondHand":
                content = "<b>" + item.name + "</b><br>";
                content += "Strength: " + item.strength + "</br>";
                content += "Accuracy: " + item.accuracy + "</br>";
                content += "Defense: " + item.defense + "</br>";
                content += "Evasion: " + item.evasion + "</br>";
                break;

            case "gearHead":
                content = "<b>" + item.name + "</b><br>";
                content += "Strength: " + item.strength + "</br>";
                content += "Accuracy: " + item.accuracy + "</br>";
                content += "Defense: " + item.defense + "</br>";
                content += "Evasion: " + item.evasion + "</br>";
                break;

            case "gearChest":
                content = "<b>" + item.name + "</b><br>";
                content += "Strength: " + item.strength + "</br>";
                content += "Accuracy: " + item.accuracy + "</br>";
                content += "Defense: " + item.defense + "</br>";
                content += "Evasion: " + item.evasion + "</br>";
                break;

            case "gearLegs":
                content = "<b>" + item.name + "</b><br>";
                content += "Strength: " + item.strength + "</br>";
                content += "Accuracy: " + item.accuracy + "</br>";
                content += "Defense: " + item.defense + "</br>";
                content += "Evasion: " + item.evasion + "</br>";
                break;

            case "gearFeet":
                content = "<b>" + item.name + "</b><br>";
                content += "Strength: " + item.strength + "</br>";
                content += "Accuracy: " + item.accuracy + "</br>";
                content += "Defense: " + item.defense + "</br>";
                content += "Evasion: " + item.evasion + "</br>";
                break;

            case "machines":
                content = "<b>" + item.name + "</b>";
                break;

            case "usable":
                content = "<b>" + item.name + "</b>";
                break;

            case "spaceShip":
                content = "<b>" + item.name + "</b><br>";
                content += "Strength: " + item.strength + "</br>";
                content += "Accuracy: " + item.accuracy + "</br>";
                content += "Defense: " + item.defense + "</br>";
                content += "Evasion: " + item.evasion + "</br>";
                break;

            case "scavenge":
                content = "<b>" + item.name + "</b>";
                break;
            
            case "building":
                content = "<b>" + item.name + "</b>";
                content += "Auto Mining Speed: " + item.autoMine + "</br>";
                content += "Auto Gathering Speed: " + item.autoGather + "</br>";
                content += "Auto Decompose Speed: " + item.autoRefine + "</br>";
                content += "Auto Scavenge Speed: " + item.autoScavenge + "</br>";
                content += "Planet Limit: " + item.planetLimit + "</br>";
                break;
        };
        content += "</div>";
        return content;
    };

    this.set = function(item, count) {
        this.item = item;
        this.count = count;

        var icon = item.icon || game.getDefaultItemIcon(item);

        this.iconDisplay = $('<img class="itemSlotIcon" src="' + sys.iconRoot + icon + '"/>');
        this.countDisplay = $('<div class="itemSlotText"></div>');
        this.menuHelper = $('<div style="display:none;" id="' + this.item.id + '"/>');

        this.mainDiv.attr('title', item.name);
        $("#" + this.id).tooltipster({
            content: this.generateItemTooltip(item),
            theme: 'tooltipster-punk',
            contentAsHTML: true,
            position: "top",
            onlyOne: true,
            interactiveTolerance: 10,
            speed: 10
        });
        this.mainDiv.append(this.iconDisplay);
        this.mainDiv.append(this.countDisplay);
        this.mainDiv.append(this.menuHelper);
        this.update(count);
    };

    this.update = function(count) {
        if (!count) count = 0;
        this.count = count;

        var countDisplayValue = count.formatNumber();
        if (count <= 0) {
            countDisplayValue = this.displayZero ? '0' : '';
        };

        this.countDisplay.text(countDisplayValue);
    };

    this.clear = function() {
        this.item = undefined;
        this.count = 0;

        if ($("#" + this.id).hasClass("tooltipstered")) {
            $("#" + this.id).tooltipster("destroy");
        }
        this.mainDiv.empty();
        this.mainDiv.attr('title', '');
    };

    this.tryDrop = function(other) {
        if (!this.canDrop || !other || !other.controlType || other.controlType != this.controlType) {
            return false;
        }

        // Right now we don't allow dragging onto occupied slots, will fix later
        if (this.item) {
            return false;
        }

        // Todo
        return true;
    };

    this.drop = function(other) {
        // Todo: Test code only, have to clean this up
        this.set(other.item, other.count);
        this.update(other.count);
        other.clear();
        other.update();
    };
};
