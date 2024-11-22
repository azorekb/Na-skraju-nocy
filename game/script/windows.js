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
		case 'firstAdoption': firstAdoption_load(); break;
		case 'wilderness': wilderness_load(); break;
		case 'castle': castle_load(); break;
		case 'treasury': dataBaseConnect(DBC_NAMES.listOfItems, gameWindow, _info); break;
		case 'settings': settings_load(); break;
		// case 'dragons': break;
		//test
		case 'usernames\' list': dataBaseConnect('t1'); break;
		case 'all texts and languages': test_texts(); break;
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
	gameWindow.style.height = typeof(_height) == 'number'? _height + 'px' : _height + 'px';
	gameWindow.style.backgroundPosition =  _backgroundPosition[0] + 'px ' + _backgroundPosition[1] + 'px';
	gameWindow.style.position = _position;
}