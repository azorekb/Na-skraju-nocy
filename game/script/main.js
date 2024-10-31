function start()
{
	for(let i = 0; i < TEXTS.start.money.length; i++)
		document.getElementById(TEXTS.start.money[i][ENGLISH]).innerHTML = TEXTS.start.money[i][POLISH];

	for(let i = 0; i < TEXTS.start.buttons.length; i++)
	{
		let theButton = document.createElement('div');
		theButton.id = TEXTS.start.buttons[i][ENGLISH];
		theButton.onclick = function(){showWindow(theButton.id)}
		document.getElementById('menuButtons').appendChild(theButton);
		let textArea = document.createElement('p');
		textArea.innerHTML = TEXTS.start.buttons[i][currentLanguage];
		theButton.appendChild(textArea);
	}


	let sending_data = new FormData();
    sending_data.append('columns', 'coppers,silver,gold,username,avatar');
    sending_data.append('table', 'nsn_login');
    sending_data.append('conditions', 'ID');
    const URL = 'script/php/connect.php';

	const DIVS =
	[
		['coppers','silver','gold','username','avatar'],
		['coppersAmount','silverAmount','goldAmount','username','avatar'],
		['innerHTML','innerHTML','innerHTML','innerHTML','src']
	];

	sendRequest(editValues,URL, sending_data, DIVS);
}

function editValues(_res, _divs)
{
	for(let i = 0; i < _divs[0].length; i++)
	{
		switch(_divs[2][i])
		{
			case 'innerHTML': document.getElementById(_divs[1][i]).innerHTML = _res['res'][0][_divs[0][i]]; break;
			case 'src': document.getElementById(_divs[1][i]).src = 'img/avatars/' + _res['res'][0][_divs[0][i]]; break;
		}
	}
}

function showWindow(_what)
{
	const mainDiv = document.getElementsByClassName('mainDiv')[0];
	const gameWindow = document.getElementById('gameWindow');

	gameWindow.style.width = mainDiv.clientWidth + 'px';
	gameWindow.style.height = mainDiv.clientHeight + 'px';
	switch(_what)
	{
		case 'wilderness':
		{
			document.getElementById('gameWindow').style.backgroundImage = 'url(' + FILES.wildMap + ')';
			gameWindow.style.backgroundPosition = '-600px -200px';
			currentWindow = 'wilderness';
			gameWindow.onmousedown = function(e)
			{
				mapDetails.mousedown = true;
				mapDetails.mousePos = [e.clientX,e.clientY];
				mapDetails.position = [document.getElementById('gameWindow').style.backgroundPositionX.slice(0,-2),document.getElementById('gameWindow').style.backgroundPositionY.slice(0,-2)];
				e.preventDefault();
			};
		}
	}
}

document.addEventListener("mousemove", function(e)
{
	if(currentWindow = 'wilderness' && mapDetails.mousedown)
	{
		mapDetails.windowSize[0] = document.getElementById('gameWindow').clientWidth - mapDetails.mapSize[0];
		mapDetails.windowSize[1] = document.getElementById('gameWindow').clientHeight - mapDetails.mapSize[1];
		let newPos = [mapDetails.position[0] - mapDetails.mousePos[0] + e.clientX, mapDetails.position[1] - mapDetails.mousePos[1] + e.clientY];
		if(newPos[0] > 0) newPos[0] = 0;
		if(newPos[0] < mapDetails.windowSize[0]) newPos[0] = mapDetails.windowSize[0];
		if(newPos[1] > 0) newPos[1] = 0;
		if(newPos[1] < mapDetails.windowSize[1]) newPos[1] = mapDetails.windowSize[1];
		document.getElementById('gameWindow').style.backgroundPosition = newPos[0] + "px " + newPos[1] + "px";
	}
});

document.addEventListener("mouseup",function(e)
{
	if(currentWindow = 'wilderness')
	{
		mapDetails.mousedown = false;
	}
});