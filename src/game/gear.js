require(["gameplayer"]);
 
function Gear(id) {
    this.id = id;
    this.slots = {};
    this.slotMetadata = {};
    this.gearChanged = false;
 
    // ---------------------------------------------------------------------------
    // general
    // ---------------------------------------------------------------------------
    this.initialize = function() {
    };
 
    this.update = function(currentTime) {
    };
 
    // ---------------------------------------------------------------------------
    // gear functions
    // ---------------------------------------------------------------------------
    this.addSlot = function(type) {
        if (this.slots[type]) {
            utils.logError("Slot was already added: " + type);
            return;
        }
 
        this.slots[type] = -1;
        this.slotMetadata[type] = undefined;
    };
     
    this.canEquip = function(itemId) {
        var itemInfo = game.getItem(itemId);
 
        if (!itemInfo || !itemInfo.gearType) {
            return false;
        }
 
        if (!this.slots[itemInfo.gearType]) {
            return false;
        }
         
        return true;
    };
 
    this.equip = function(itemId, metadata) {
        // get the item info
        var itemInfo = game.getItem(itemId);
 
        if (!itemInfo || !itemInfo.gearType) {
            utils.logError("attempt to equip unknown or invalid item: " + itemId + itemInfo.category);
            return;
        }
 
        if (!this.slots[itemInfo.gearType]) {
            utils.logError("attempt to equip item but slot was not set: " + itemId
                    + " in " + itemInfo.gearType);
            return;
        }
        replacedBy = null;
        // If there's something in the slot already, we need to add it to
        // the players storage, and unequip it.
        if(this.slots[itemInfo.gearType]!=-1) {
            replacedBy = this.slots[itemInfo.gearType];
            game.player.storage.addItem(this.slots[itemInfo.gearType]);
            game.player.unEquip(this.slots[itemInfo.gearType]);
        }
        // Now we assign the new piece of gear to the slot.
        this.slots[itemInfo.gearType] = itemId;
        this.slotMetadata[itemInfo.gearType] = metadata;
        this.gearChanged = true;
        return replacedBy;
    };
     
    this.hasGearEquipped = function(type){
        return this.slots[type] && this.slots[type] > -1;
    };
     
    this.getSlots = function() {
        return Object.keys(this.slots);
    };
     
    this.getItemInSlot = function(type) {
        if(this.slots[type] < 0) {
            return undefined;
        }
         
        return this.slots[type];
    };
     
    this.getMetadataInSlot = function(type) {
        return this.slotMetadata[type];
    };
     
    this.unEquip = function(type) {
        if (!this.slots[type]) {
            Utils.logError("attempt to un-equip item but slot was not set: "
                    + type);
            return;
        }
        this.slots[type] = -1;
        this.slotMetadata[type] = undefined;
        this.gearChanged = true;
        return;
    };
     
    this.getStats = function() {
        // Todo: calculate all the stats for the current gear and return it
        var statNames = ["strength", "accuracy", "defense", "evasion", "travelSpeed", "attackSpeed", "experience", "health", "miningLuck", "scavengeLuck", "lootLuck", "counter", "regeneration", "resillience", "perception"];
        var stats = {};
        for(var type in this.slots) {
            if(this.slots[type] != -1) {
                var item = game.getItem(this.slots[type]);
                for(var i=0;i<statNames.length;i++){
                    if(item[statNames[i]]){
                        if(!stats[statNames[i]]){stats[statNames[i]]=0;}
                        stats[statNames[i]] += item[statNames[i]];
                    }
                }
            }
        }
        return stats;
    };
 
    // ---------------------------------------------------------------------------
    // internal
    // ---------------------------------------------------------------------------
    this._getStorageKey = function() {
        return 'gear_' + this.id + '_';
    };
 
    // ---------------------------------------------------------------------------
    // loading / saving
    // ---------------------------------------------------------------------------
    this.save = function() {
        var storageKey = this._getStorageKey();
        for(var key in this.slots) {
            localStorage[storageKey + key] = this.slots[key];
             
            // Todo: save metadata
        }
    };
 
    this.load = function() {
        var storageKey = this._getStorageKey();
        for(var key in this.slots) {
            var itemId = utils.load(storageKey + key, undefined);
            if(!itemId || itemId == -1) {
                continue;
            }
             
            console.log(this.equip(itemId));
            // Todo: load metadata
        }
    };
     
    this.reset = function(fullReset) {
        for(var key in this.slots) {
            if(!this.hasGearEquipped(key)) {
                continue;
            }
            this.unEquip(key);
        }
    };
}