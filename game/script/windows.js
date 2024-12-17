function showWindow(_what, _info = null)
{
	if(tutorial == 1) return;
	const gameWindow = document.getElementById('gameWindow');

	gameWindow.innerHTML = '';
	currentWindow = _what ? _what : currentWindow;
	gameWindow.onmousedown = null;
	gameWindow.onclick = null;
	gameWindow.onmousemove = null;
	gameWindow.style = '';

	switch(_what)
	{
		case 'firstAdoption': sendRequest(DBC_NAMES.firstAdoptionDialogue, gameWindow); break;
		case 'dragons': sendRequest(DBC_NAMES.listOfDragons, gameWindow); break;
		case 'wilderness': sendRequest(DBC_NAMES.wildernessData, gameWindow); break;
		case 'town': sendRequest(DBC_NAMES.buildingList, gameWindow); break;
		case 'treasury': sendRequest(DBC_NAMES.listOfItems, gameWindow, _info); break;
		case 'settings': sendRequest(DBC_NAMES.settingsOptions, gameWindow); break;
	} 
}

document.addEventListener("mousemove", function(e)
{
	switch(currentWindow)
	{
		case 'wilderness': wilderness_mapMove(e); break;
	}
});

document.addEventListener("mouseup",function(e)
{
	switch(currentWindow)
	{
		case 'wilderness': wilderness_mapRelease(); break;
	}
});

function windowSettings(_width = 500, _height = 500, _backgroundImage = '', _backgroundPosition = [0,0], _position = '')
{
	const gameWindow = document.getElementById('gameWindow');
	gameWindow.innerHTML = '';
	gameWindow.style.backgroundImage = 'url(' + _backgroundImage + ')';
	gameWindow.style.width = typeof(_width) == 'number'? _width + 'px' : _width;
	gameWindow.style.minHeight = typeof(_height) == 'number'? _height + 'px' : _height + 'px';
	gameWindow.style.backgroundPosition =  _backgroundPosition[0] + 'px ' + _backgroundPosition[1] + 'px';
	gameWindow.style.position = _position;
}