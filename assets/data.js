Items = {
		'oxygen': {	'id': 1, 'name': 'Oxygen', 'baseValue': 0.1, },
		'oxygenCan': { 'id': 2, 'name': 'Oxygen can', 'baseValue': 11, 'craftResult': 1, 'craftCost': {}, },
		'oxygenTank': {	'id': 3, 'name': 'Oxygen tank', 'baseValue': 120, 'craftResult': 1, 'craftCost': {}, },
		
		'copper': { 'id': 10, 'name': 'Copper', 'baseValue': 0.5, },
		'copperBar': {	'id': 11, 'name': 'Copper bar', 'baseValue': 5,	'craftResult': 1, 'craftCost': {}, },
			
		'iron': { 'id': 20,	'name': 'Iron',	'baseValue': 1,	},
		'ironBar': { 'id': 21, 'name': 'Iron bar', 'baseValue': 10, 'craftResult': 1, 'craftCost': {}, },
		
		'gold':	{ 'id': 30,	'name': 'Gold', 'baseValue': 100, },
		'goldBar': { 'id': 31, 'name': 'Gold bar', 'baseValue': 1000, 'craftResult': 1, 'craftCost': {}, },
		
		'fuel':	{ 'id': 400, 'name': 'Fuel', 'baseValue': 1000, },
		'fuelCan':	{ 'id': 401, 'name': 'Fuel can', 'baseValue': 1000, 'craftResult': 1, 'craftCost': {}, },
		'fuelTank': { 'id': 402, 'name': 'Fuel tank', 'baseValue': 1000, 'craftResult': 1, 'craftCost': {}, },
			
		'copperPick': { 'id': 101, 'name': 'Copper Pickaxe', 'baseValue': 15, 'storageLimit': 1, 'craftResult': 1, 'craftCost': {},	},
		'ironPick': { 'id': 102, 'name': 'Iron Pickaxe', 'baseValue': 25, 'storageLimit': 1, 'craftResult': 1, 'craftCost': {},	},
		'goldPick':	{ 'id': 103, 'name': 'Gold Pickaxe', 'baseValue': 2500,	'storageLimit': 1, 'craftResult': 1, 'craftCost': {}, }
};

//---------------------------------------------------------------------------
//Set the crafting cost
//---------------------------------------------------------------------------
Items.oxygenCan.craftCost[Items.oxygen.id] = 1;
Items.oxygenCan.craftCost[Items.ironBar.id] = 1;

Items.oxygenTank.craftCost[Items.oxygenCan.id] = 1;
Items.oxygenTank.craftCost[Items.ironBar.id] = 10;

Items.fuelCan.craftCost[Items.fuel.id] = 10;
Items.fuelCan.craftCost[Items.ironBar.id] = 1;

Items.fuelTank.craftCost[Items.fuelCan.id] = 1;
Items.fuelTank.craftCost[Items.ironBar.id] = 10;

Items.copperBar.craftCost[Items.copper.id] = 10;
Items.copperPick.craftCost[Items.copperBar.id] = 10;

Items.ironBar.craftCost[Items.iron.id] = 10;
Items.ironPick.craftCost[Items.ironBar.id] = 10;

Items.goldBar.craftCost[Items.gold.id] = 10;
Items.goldPick.craftCost[Items.goldBar.id] = 10;

//---------------------------------------------------------------------------
//Planet data
//---------------------------------------------------------------------------
Planets = {
		'earth': { 'id': 1,	'name': 'Earth', 'gravity': 1, 'baseMultiplier': 1,	'distance': 0, 'resources': {} },			
		'moon':	{ 'id': 2, 'name': 'Moon', 'gravity': 0.166, 'baseMultiplier': 1, 'distance': 384, 'resources': {} },
};

//---------------------------------------------------------------------------
//Populate the resources
//---------------------------------------------------------------------------
Planets.earth.resources[Items.oxygen.id] = { 'mode': 'gather', 'minDepth': -20, 'maxDepth': 0, 'baseChance': 1 };
Planets.earth.resources[Items.fuel.id] = { 'mode': 'gather', 'minDepth': -20, 'maxDepth': 0, 'baseChance': 0.1 };
Planets.earth.resources[Items.iron.id] = { 'mode': 'mine', 'minDepth': 5, 'maxDepth': 350, 'baseChance': 0.5 };
Planets.earth.resources[Items.copper.id] = { 'mode': 'mine', 'minDepth': 5, 'maxDepth': 1500, 'baseChance': 0.9 };
Planets.earth.resources[Items.gold.id] = { 'mode': 'mine', 'minDepth': 500, 'maxDepth': 5500, 'baseChance': 0.1 };

Planets.moon.resources[Items.iron.id] = { 'mode': 'mine', 'minDepth': 20, 'maxDepth': 100, 'baseChance': 0.9 };
