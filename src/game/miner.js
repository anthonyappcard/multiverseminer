function Miner(id) {
	this.id = id;
	this.baseMineSpeed = 1;

	//TODO: All the TODO from the exp and level on the combatant.js will also apply here, reffer to combatant.js, same functions and variables
	this.exp = 0;
	this.expRequired = 500;
	this.level = 1;
	
	// ---------------------------------------------------------------------------
	// general
	// ---------------------------------------------------------------------------
	this.initialize = function() {		
		this.updateUI();
	};
	
	this.update = function(currentTime) {
	};

	this.gather = function(location) {
		var tableId = location.getGatherLootTableId();
		return this._dropResources(tableId);
	};

	this.mine = function(location, power, luck) {
		power = power || 1; //power comes from pickaxe
		luck = luck || 0;
		var tableId = location.getMiningLootTableId();
		return this._dropResources(tableId, power, luck);
	};

	this.scavenge = function(location) {
		var tableId = 1000;
		return this._dropResources(tableId);
	};
	
	this.gainExp = function(value) {
		this.exp += value;
		this.checkLevel();
	};
    
	this.checkLevel = function() {
		this.expRequired = Math.pow(1.125, this.level-1) * 500;
		if(this.exp >= this.expRequired) {
			this.level ++;
			this.exp -= this.expRequired;
			this.checkLevel();
			return true;
		}
		if(this.id == 'player') {
			this.expRequired = Math.pow(1.125, this.level-1) * 500;
			this.updateUI();
		}
		return false;
	};
	
	this.updateUI = function() { //TODO: move to its own UI section
		$('#minerXP')[0].innerHTML = "Miner XP: " + Math.floor(this.exp) + " / " + Math.ceil(this.expRequired);
		$('#minerLevel')[0].innerHTML = "Miner Level: " + this.level;
	};

	// ---------------------------------------------------------------------------
	// internal
	// ---------------------------------------------------------------------------
	this._dropResources = function(tableId, power, luck) {
		power = power || 1; //never too safe ...
		luck = luck || 0;
		var table = game.getLootTable(tableId);
		if (!table || table.length <= 0) {
			return;
		}
		// Todo: apply modifiers and tools etc	
		items = game.loot(table, this.baseMineSpeed * power, luck);
		this.gainExp(items.length);
		return items;
	};

	this._getStorageKey = function() {
		return 'miner_' + this.id + '_';
	};

	// ---------------------------------------------------------------------------
	// loading / saving
	// ---------------------------------------------------------------------------
	this.save = function() {
		var storageKey = this._getStorageKey();
		localStorage[storageKey + 'baseMineSpeed'] = this.baseMineSpeed;
		localStorage[storageKey + 'exp'] = this.exp;
		localStorage[storageKey + 'expRequired'] = this.expRequired;
		localStorage[storageKey + 'level'] = this.level;
	};

	this.load = function() {
		var storageKey = this._getStorageKey();
		this.baseMineSpeed = utils.loadFloat(storageKey + 'baseMineSpeed', 1);
		this.exp = utils.loadFloat(storageKey + 'exp', 0);
		this.expRequired = utils.loadFloat(storageKey + 'expRequired', 500);
		this.level = utils.loadFloat(storageKey + 'level', 1);
	};

	this.reset = function(fullReset) {
		this.baseMineSpeed = 1;
        this.exp = 0;
        this.expRequired = 500;
        this.level = 1;
	};
}
