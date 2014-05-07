Utils = {		
}

// ---------------------------------------------------------------------------
// Utility functions
// ---------------------------------------------------------------------------
Utils.load = function(property, defaultValue)
{
	loadedValue = localStorage[property];
	if (localStorage[property] == undefined)
	{
		return defaultValue;
	}

	return loadedValue;
}

Utils.loadBool = function(property, defaultValue)
{
	loadedValue = localStorage[property];
	if (localStorage[property] == undefined)
	{
		return defaultValue;
	}

	return loadedValue == "true";
}

Utils.loadInt = function(property, defaultValue)
{
	loadedValue = localStorage[property];
	if (localStorage[property] == undefined)
	{
		return defaultValue;
	}

	return parseInt(loadedValue);
}

Utils.loadFloat = function(property, defaultValue)
{
	loadedValue = localStorage[property];
	if (localStorage[property] == undefined)
	{
		return defaultValue;
	}

	return parseFloat(loadedValue);
}

Utils.pad = function(n, width, z)
{
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

Utils.getDayTimeInSeconds = function()
{
	var now = new Date();
    then = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
    return now.getTime() - then.getTime();
}

Utils.logFormat = function(level, message, popup)
{
	var time = '[' + Date.now() - this.startTime + ']: ';
	var fullMessage = time + level + ' '+ message;

	console.log(fullMessage);

	if(popup)
	{
		alert(fullMessage)
	}
}

Utils.log = function(message)
{
	this.logFormat("INFO", message, false);
}

Utils.stackTrace = function()
{
    var err = new Error();
    return err.stack;
}

Utils.logError = function(message)
{

	this.logFormat("ERROR", message, true);
}