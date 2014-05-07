function Player()
{
	this.miner = new Miner('player');
	this.combatant = new Combatant('player');
	this.storage = new Storage('player');
	
	this.oxygenConsumption = 1;
	this.lastOxygenConsumption = Date.now();
	
	//---------------------------------------------------------------------------
	//player functions
	//---------------------------------------------------------------------------
	this.update = function(elapsed)
	{
		this.miner.update(elapsed);
		this.combatant.update(elapsed);
		
		var currentTime = Date.now();
		if (currentTime - this.lastOxygenConsumption > 1000)
		{
			// Todo: need to do something when this runs out
			if (this.storage.getItemCount(Items.oxygen.id) > 0)
			{
				this.storage.removeItem(Items.oxygen.id);
			}
			
			this.lastOxygenConsumption = currentTime;
		}
	}
	
	this.mine = function()
	{
		if (!game.currentPlanet)
		{
			return;
		}
		
		game.settings.addStat('manualDigCount');
		
		// Todo: this is stub
		game.currentPlanet.currentDepth++;
		
		var items = this.miner.mine();
		if (items)
		{
			this.storage.addItems(items);
		}
	}
	
	this.gather = function()
	{
		if (!game.currentPlanet)
		{
			return;
		}
		
		game.settings.addStat('manualGatherCount');
		
		var items = this.miner.gather();
		if(items)
		{
			this.storage.addItems(items);
		}
	}
	
	this.craft = function(what, count)
	{
		// For now we craft with our inventory into our inventory
		game.craft(this.storage, this.storage, what, count);
	}
	
	//---------------------------------------------------------------------------
	//loading / saving
	//---------------------------------------------------------------------------
	this.save = function()
	{
		this.miner.save();
		this.combatant.save();
		this.storage.save();
		
		localStorage.playerOxygenConsumption = this.oxygenConsumption;
	}
	
	this.load = function()
	{
		this.miner.load();
		this.combatant.load();
		this.storage.load();
		
		this.oxygenConsumption = Utils.loadFloat('playerOxygenConsumption', 1);
	}
	
	this.reset = function(fullReset)
	{
		this.miner.reset(fullReset);
		this.combatant.reset(fullReset);
		this.storage.reset(fullReset);
		
		this.oxygenConsumption = 1;
	}
}