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
	if(tutorial == 1) return;
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
			tutorial = 1;
			windowSettings(512, 512, FILES.breedersHall);
			gameWindow.style.display = 'flex';
			gameWindow.style.alignItems = 'end';

			newElement('div', gameWindow, 'leftCharacter femBreeder', 'leftBreeder');
			newElement('div', gameWindow, 'rightCharacter maleBreeder', 'rightBreeder');
			const dialogueBox = newElement('div', gameWindow, 'dialogueBox', 'dialogueBox');
			newElement('div', dialogueBox, 'nameBox', 'nameBox');
			newElement('div', dialogueBox, 'textBox', 'textBox');

			dialogue('firstAdoption', 0);
		}
		break;
		case 'wilderness':
		{
			windowSettings(undefined, 370, FILES.wildMap, [-600,-200], 'relative');

			newElement('span', gameWindow, 'positionText', 'positionText');
			newElement('div', gameWindow, '', 'activeObjectDiv');

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
				const X = e.x - gameWindow.style.backgroundPositionX.slice(0,-2) - gameWindow.offsetParent.offsetLeft;
				const Y = e.y - gameWindow.style.backgroundPositionY.slice(0,-2) - gameWindow.offsetParent.offsetTop;
				const cursorPos = [X, Y];
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

function windowSettings(_width = 500, _height = 500, _backgroundImage = '', _backgroundPosition = [0,0], _position = '')
{
	const gameWindow = document.getElementById('gameWindow');
	gameWindow.style.backgroundImage = 'url(' + _backgroundImage + ')';
	gameWindow.style.width = _width + 'px';
	gameWindow.style.height = _height + 'px';
	gameWindow.style.backgroundPosition =  _backgroundPosition[0] + 'px ' + _backgroundPosition[1] + 'px';
	gameWindow.style.position = _position;
}

function dialogue(_which, _scene)
{
	switch(_which)
	{
		case 'firstAdoption':
			const textBox = document.getElementById('textBox');
			textBox.innerText = TEXTS.firstAdoption.dialogue[_scene][currentLanguage] + '\n';
			textBox.style.textAlign = _scene == 4 ? 'center' : 'left';
			const who = TEXTS.firstAdoption.settings[_scene].who;
			const nameBox = document.getElementById('nameBox');
			nameBox.innerText = TEXTS.firstAdoption.names[who][currentLanguage];
			nameBox.style.marginLeft = who ? 'auto' : '3px';
			let isThatEnd = false; 
			switch(TEXTS.firstAdoption.settings[_scene].button)
			{
				case 3: 
					isThatEnd = true;
				case 0:
					const button = newElement('button', textBox, 'buttonOk buttonNext');
					button.innerHTML = '&#8811;';
					button.onclick = isThatEnd ? function()
					{
						textBox.innerHTML = '<img src = "' + FILES.loading + '">';
						dataBaseConnect(DBC_NAMES.addFirstDragon);
					}:
					function()
					{
						dialogue('firstAdoption', _scene + 1)
					};
				break;
				case 1:
					const buttonBox = newElement('div', textBox, 'flexbox');
					for(let i = 0; i < FILES.dragonsChoose.length; i++)
					{
						const button = newElement('button', buttonBox, 'buttonDragon');
						button.style.backgroundImage = 'url(' + FILES.dragonsChoose[i] + ')';
						button.onclick = function()
						{
							temporary.dragon = i;
							temporary.element = Math.floor(Math.random() * DRAGON_RANDOM[i].length);
							dialogue('firstAdoption', _scene + 1);
						};
						button.onmouseover = function(){button.innerText = TEXTS.lists.species[i][currentLanguage]}
						button.onmouseout = function(){button.innerText = ''}
					}
				break;
				case 2:
					const daBox = newElement('div', textBox, 'flexbox');
					const daDragon = newElement('div', daBox, 'buttonDragon');
					daDragon.style.backgroundImage = 'url(' + FILES.dragonsChoose[temporary.dragon] + ')';
					daDragon.style.cursor = 'auto';
					daDragon.style.width = '160px';
					daDragon.style.height = '160px';
					const formDiv = newElement('div', daBox, 'formDiv');
					const gender = newElement('select', formDiv, '', 'dragonGender');
					const GENDER = [['samiec','male',], ['samica', 'female']];
					for(let i = 0; i < GENDER.length; i++)
					{
						const option = newElement('option', gender);
						option.innerText = GENDER[i][currentLanguage];
						option.value = i;
					}
					formDiv.innerHTML += '<br>';
					newElement('input', formDiv, '', 'dragonName');
					formDiv.innerHTML += '<br>';
					const ok = newElement('button', formDiv, 'buttonOk');
					ok.innerText = 'OK';
					ok.onclick = function()
					{
						temporary.gender = document.getElementById('dragonGender').value;
						const daName = document.getElementById('dragonName').value;
						if(daName.length >= 3 && daName.length <= 30)
						{
							temporary.name = daName;
							dialogue('firstAdoption', _scene + 1);
						}
					}
				break;
				case 4:
					document.getElementById('gameWindow').removeChild(document.getElementById('leftBreeder'));
					const finish = newElement('button', textBox, 'buttonOk');
					finish.innerText = TEXTS.firstAdoption.end[currentLanguage];
					finish.onclick = function()
					{
						showWindow('castle');
					};
			}
		break;
	}
}