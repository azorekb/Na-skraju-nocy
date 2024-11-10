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
		case 'wilderness': wilderness_load(); break;
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