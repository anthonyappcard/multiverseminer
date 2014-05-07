function Planet(data)
{
	this.data = data;
	this.miner = new Miner('planet' + data.id);
	this.storage = new Storage('planet' + data.id);
	
	this.currentDepth = 0;

	//---------------------------------------------------------------------------
	//general planet functions
	//---------------------------------------------------------------------------
	this.update = function(elapsed)
	{
		this.miner.update(elapsed);
	}
	
	this.getGatherableResources = function()
	{
		return this._getAvailableResources('gather');
	}
	
	this.getMinableResources = function()
	{
		return this._getAvailableResources('mine');
	}
	
	this._getAvailableResources = function(mode)
	{
		var results = [];
		var keys = Object.keys(this.data.resources);
		for(var i = 0; i < keys.length; i++)
		{
			var resource = this.data.resources[keys[i]];
			
			// We push the resource id into the resource to link it up on drop
			resource.id = keys[i];
			
			if (resource.mode == undefined || resource.mode != mode)
			{
				continue;
			}
			
			var min = resource.minDepth || 0;
			var max = resource.maxDepth || Number.MAX_VALUE;
			if(min > this.currentDepth || max < this.currentDepth)
			{
				continue;
			}
			
			results.push(resource);
		}
		
		return results;
	}
	
	//---------------------------------------------------------------------------
	//loading / saving / reset
	//---------------------------------------------------------------------------
	this.getStorageKey = function()
	{
		return 'planet' + this.data.id + '_';
	}
	
	this.save = function()
	{
		this.miner.save();
		this.storage.save();
		
		var storageKey = this.getStorageKey();
		localStorage[storageKey + 'currentDepth'] = this.currentDepth;
	}
	
	this.load = function()
	{
		this.miner.load();
		this.storage.load();
		
		var storageKey = this.getStorageKey();
		
		this.currentDepth = Utils.loadInt(storageKey + 'currentDepth', 0);
	}
	
	this.reset = function()
	{
		this.miner.reset();
		this.storage.reset();
		
		this.currentDepth = 0;
	}
}