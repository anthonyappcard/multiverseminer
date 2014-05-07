//---------------------------------------------------------------------------
///Statistics
//---------------------------------------------------------------------------
function Statistics(key)
{
	this.key = key;
	
	this.clickCount = 0;
	
	this.autoDigCount = 0;
	
	this.manualDigCount = 0;
	this.manualGatherCount = 0;
	
	//---------------------------------------------------------------------------
	//loading / saving / reset
	//---------------------------------------------------------------------------
	this.getStorageKey = function()
	{
		return 'stat_' + this.id + '_';
	}
	
	this.save = function()
	{
		var storageKey = this.getStorageKey();
		localStorage[storageKey + 'clickCount'] = this.clickCount;
		
		localStorage[storageKey + 'autoDigCount'] = this.autoDigCount;
		
		localStorage[storageKey + 'manualDigCount'] = this.manualDigCount;
		localStorage[storageKey + 'manualGatherCount'] = this.manualGatherCount;
	}
	
	this.load = function()
	{		
		var storageKey = this.getStorageKey();
		this.clickCount = Utils.loadInt(storageKey + 'clickCount', 1);
		
		this.autoDigCount = Utils.loadInt(storageKey + 'autoDigCount', 1);
		
		this.manualDigCount = Utils.loadInt(storageKey + 'manualDigCount', 1);
		this.manualGatherCount = Utils.loadInt(storageKey + 'manualGatherCount', 1);
	}
	
	this.reset = function(fullReset)
	{
		this.clickCount = 0;
		
		this.autoDigCount = 0;
		
		this.manualDigCount = 0;
		this.manualGatherCount = 0;
	}
};

//---------------------------------------------------------------------------
//Miner
//---------------------------------------------------------------------------
function Miner(id)
{
	this.id = id;
	
	this.baseMineSpeed = 1;
	
	//---------------------------------------------------------------------------
	//general
	//---------------------------------------------------------------------------
	this.update = function(elapsed)
	{		
	}
	
	this.gather = function()
	{
		var resources = game.currentPlanet.getGatherableResources();
		if (!resources || resources.length <= 0)
		{
			return;
		}

		// Todo: apply modifiers and tools etc
		return this._dropResources(resources);
	}
	
	this.mine = function()
	{
		var resources = game.currentPlanet.getMinableResources();
		if (!resources || resources.length <= 0)
		{
			return;
		}
		
		// Todo: apply modifiers and tools etc
		return  this._dropResources(resources);
	}
	
	this._dropResources = function(resources)
	{
		var items = {};
		for(var i = 0; i < resources.length; i++)
		{
			var resource = resources[i];
			var chance = resource.baseChance;
			if(Math.random() <= chance)
			{
				// Todo: allow for drop of more than one?
				items[resource.id] = 1;
			}
		}
		
		return items;
	}
	
	//---------------------------------------------------------------------------
	//loading / saving
	//---------------------------------------------------------------------------
	this.getStorageKey = function()
	{
		return 'miner_' + this.id + '_';
	}
	
	this.save = function()
	{
		var storageKey = this.getStorageKey();
		
		localStorage[storageKey + 'baseMineSpeed'] = this.baseMineSpeed;
	}
	
	this.load = function()
	{	
		var storageKey = this.getStorageKey();

		this.baseMineSpeed = Utils.loadFloat(storageKey + 'baseMineSpeed', 1);
	}
	
	this.reset = function(fullReset)
	{
		this.baseMineSpeed = 1;
	}
}

//---------------------------------------------------------------------------
//Combatant
//---------------------------------------------------------------------------
function Combatant(id)
{
	this.id = id;
	this.health = 100;
	this.defense = 100;
	
	this.baseAttackSpeed = 1;
	
	//---------------------------------------------------------------------------
	//general
	//---------------------------------------------------------------------------
	this.update = function(elapsed)
	{		
	}
	
	//---------------------------------------------------------------------------
	//loading / saving
	//---------------------------------------------------------------------------
	this.getStorageKey = function()
	{
		return 'combatant_' + this.id + '_';
	}
	
	this.save = function()
	{
		var storageKey = this.getStorageKey();
		
		localStorage[storageKey + 'health'] = this.health;
		localStorage[storageKey + 'defense'] = this.defense;
		
		localStorage[storageKey + 'baseAttackSpeed'] = this.baseAttackSpeed;
	}
	
	this.load = function()
	{	
		var storageKey = this.getStorageKey();
		
		this.health = Utils.loadFloat(storageKey + 'health', 0);
		this.defense = Utils.loadFloat(storageKey + 'defense', 0);
		
		this.baseAttackSpeed = Utils.loadFloat(storageKey + 'baseAttackSpeed', 1);
	}
	
	this.reset = function(fullReset)
	{
		this.health = 0;
		this.defense = 0;
		
		this.baseAttackSpeed = 1;
	}
}

//---------------------------------------------------------------------------
//Storage
//---------------------------------------------------------------------------
function Storage(id)
{
	this.id = id;
	this.items = {};
	
	//---------------------------------------------------------------------------
	//general functions
	//---------------------------------------------------------------------------
	this.canAdd = function(type)
	{
		if(!this.items[type])
		{
			return true;
		}
		
		// See if this item has limited storage capacity
		var limit = game.itemDictionary[type].storageLimit;
		if (!limit)
		{
			return true;
		}
		
		return limit < this.items[type];
	}
	
	this.addItem = function(type, value)
	{
		if (!value) { value = 1; }		
		if(!this.items[type])
		{
			this.items[type] = 0;
		}

		this.items[type] += value;
	}
	
	this.addItems = function(items)
	{
		var keys = Object.keys(items);
		for(var i = 0; i < keys.length; i++)
		{
			var key = keys[i];
			this.addItem(key, items[key]);
		}
	}
	
	this.getItemCount = function(type)
	{
		if(!this.items[type])
		{
			return 0;
		}
		
		return this.items[type];
	}
	
	this.removeItem = function(type, value)
	{
		if (!value) { value = 1; }
		
		if (!this.items[type] || this.items[type] < value)
		{
			Utils.logError("RemoveItem of " + value + " called with insufficient items: " + type + " was "+this.items[type]);
			return;
		}
		
		this.items[type] -= value;
		if(this.items[type] <= 0)
		{
			// We depleted the resource so we remove the entry
			delete this.items[type];
		}
	}
	
	//---------------------------------------------------------------------------
	//loading / saving
	//---------------------------------------------------------------------------
	this.getStorageKey = function()
	{
		return 'storage_' + this.id + '_';
	}
	
	this.save = function()
	{
		var storageKey = this.getStorageKey();
		
		var keys = Object.keys(this.items);
		for(var i = 0; i < keys.length; i++)
		{
			var key = keys[i];
			var value = this.items[key];
			Utils.log("Saving item "+key+" with "+value);
			localStorage[storageKey + key] = value;
		}
	}
	
	this.load = function()
	{
		var storageKey = this.getStorageKey();
		
		var keys = Object.keys(game.itemDictionary);
		for(var i = 0; i < keys.length; i++)
		{
			var key = keys[i];
			if (!localStorage[storageKey + key])
			{
				continue;
			}
			
			this.items[key] = Utils.loadInt(storageKey + key, 0);
			Utils.log("Loaded item "+key+" with "+this.items[key]);
		}
	}
	
	this.reset = function(fullReset)
	{
		this.items = {};
	}
}