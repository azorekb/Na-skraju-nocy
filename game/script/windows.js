let mapDetails = 
{
    position: [0,0],
    mousePos: [0,0],
    mousedown: false,
    mapSize: [1280,789],
    windowSize: [0,0],
    objects: 
    [
        {
            img: 'castle',
            position: [803,321,851,360],
            function: showWindow,
            functionArguments: 'castle'
        }
    ],
    objectCaught: -1
}

function showWindow(_what)
{
	if(tutorial) return;
	const gameWindow = document.getElementById('gameWindow');

	gameWindow.innerHTML = '';
	currentWindow = _what;
	gameWindow.onmousedown = null;
	gameWindow.onclick = null;
	gameWindow.onmousemove = null;
	gameWindow.style = '';

	switch(_what)
	{
		case 'firstAdoption':
		{
			tutorial = true;
		}
		break;
		case 'wilderness':
		{
			gameWindow.style.backgroundImage = 'url(' + FILES.wildMap + ')';
			gameWindow.style.height = '370px';
			gameWindow.style.backgroundPosition = '-600px -200px';
			gameWindow.style.position = 'relative';

			const positionText = document.createElement('span');
			positionText.id = 'positionText';
			positionText.style.color = 'black';
			gameWindow.appendChild(positionText);
			const activeObjectDiv = document.createElement('div');
			activeObjectDiv.id = 'activeObjectDiv';
			gameWindow.appendChild(activeObjectDiv);

			gameWindow.onmousedown = function(e)
			{
				mapDetails.mousedown = true;
				mapDetails.mousePos = [e.clientX,e.clientY];
				mapDetails.position = [document.getElementById('gameWindow').style.backgroundPositionX.slice(0,-2),document.getElementById('gameWindow').style.backgroundPositionY.slice(0,-2)];
				e.preventDefault();
			};
			gameWindow.onclick = function(e)
			{
				const OBJECT = mapDetails.objectCaught;
				if(OBJECT >= 0)
				{
					const FUNCTION = mapDetails.objects[OBJECT].function;
					const ARGUMENTS = mapDetails.objects[OBJECT].arguments;
					FUNCTION(ARGUMENTS);
				}
			};
			gameWindow.onmousemove = function(e)
			{
				const X = e.x - gameWindow.offsetLeft;
				const Y = e.y - gameWindow.offsetTop;
				const cursorPos = [X - gameWindow.style.backgroundPositionX.slice(0,-2), Y - gameWindow.style.backgroundPositionY.slice(0,-2)];
				document.getElementById('positionText').innerHTML = Math.floor(cursorPos[0] / 1)  + '/' + Math.floor(cursorPos[1] / 1);

				let objectCaught = -1;
				for(let i = 0; i < mapDetails.objects.length; i++)
					if(cursorPos[0] >= mapDetails.objects[i].position[0] &&
						cursorPos[1] >= mapDetails.objects[i].position[1] &&
						cursorPos[0] <= mapDetails.objects[i].position[2] && 
						cursorPos[1] <= mapDetails.objects[i].position[3])
					{
						objectCaught = i;
					}
				const activeObjectDiv = document.getElementById('activeObjectDiv');
				if(objectCaught >= 0)
				{
					activeObjectDiv.style.width = (mapDetails.objects[objectCaught].position[2] - mapDetails.objects[objectCaught].position[0]) + 'px';
					activeObjectDiv.style.height = (mapDetails.objects[objectCaught].position[3] - mapDetails.objects[objectCaught].position[1]) + 'px';
					activeObjectDiv.style.backgroundImage = 'url(img/' + mapDetails.objects[objectCaught].img + '_active.webp)';
					activeObjectDiv.style.position = 'absolute';
					activeObjectDiv.style.left = (mapDetails.objects[objectCaught].position[0] + gameWindow.style.backgroundPositionX.slice(0,-2) * 1) + 'px';
					activeObjectDiv.style.top = (mapDetails.objects[objectCaught].position[1] + gameWindow.style.backgroundPositionY.slice(0,-2) * 1) + 'px';
					activeObjectDiv.style.cursor = 'pointer';
				}
				else
				{
					activeObjectDiv.style.width = 0;
					activeObjectDiv.style.height = 0;
					activeObjectDiv.style.backgroundImage = '';
				}
				mapDetails.objectCaught = objectCaught;
			};
		} break;
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