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
		case 'dragons': 
			const table = newElement('table', gameWindow);
			for(let i = 0; i < 10; i++)
			{
				table.insertRow(i).insertCell(0).innerText = i;
				table.rows[i].insertCell(1).innerText = TEXTS.lists.elements[i][0];
				table.rows[i].insertCell(2).innerText = (i + 10);
				table.rows[i].insertCell(3).innerText = TEXTS.lists.elements[i + 10][0];
				table.rows[i].insertCell(4).innerText = (i + 20);
				table.rows[i].insertCell(5).innerText = TEXTS.lists.elements[i + 20][0];
				if(i < 2)
				{
					table.rows[i].insertCell(6).innerText = (i + 30);
					table.rows[i].insertCell(7).innerText = TEXTS.lists.elements[i + 30][0];
				}
			}
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
	gameWindow.style.width = _width + 'px';
	gameWindow.style.height = _height + 'px';
	gameWindow.style.backgroundPosition =  _backgroundPosition[0] + 'px ' + _backgroundPosition[1] + 'px';
	gameWindow.style.position = _position;
}