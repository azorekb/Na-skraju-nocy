function firstAdoption_load(res)
{
    tutorial = 1;
	windowSettings(512, 512, FILES.breedersHall);
    const gameWindow = document.getElementById('gameWindow');
	gameWindow.style.display = 'flex';
	gameWindow.style.alignItems = 'end';
    newElement('div', gameWindow, 'left character femBreeder', 'leftBreeder');
	newElement('div', gameWindow, 'right character maleBreeder', 'rightBreeder');
	const dialogueBox = newElement('div', gameWindow, 'dialogueBox', 'dialogueBox');
	newElement('div', dialogueBox, 'nameBox', 'nameBox');
	newElement('div', dialogueBox, 'textBox', 'textBox');

    firstAdoption_dialogue(0, res);
}

function firstAdoption_dialogue(_scene, res)
{
	const textBox = document.getElementById('textBox');
	textBox.innerText = res['texts'][_scene]['text'].replace('[br]', '\n\n').replace('[n]', '\n') + '\n';
	textBox.style.textAlign = _scene == 4 ? 'center' : 'left';
	const who = res['texts'][_scene]['who'];
	const nameBox = document.getElementById('nameBox');
	nameBox.innerText = res['characters'][who]['text'];
	nameBox.style.marginLeft = who ? 'auto' : '3px';
	let isThatEnd = false; 
	switch(res['texts'][_scene]['button'] * 1)
	{
		case 3: 
			isThatEnd = true;
		case 0:
			const button = newElement('button', textBox, 'buttonOk buttonNext');
			button.innerHTML = '&#8811;';
			button.onclick = isThatEnd ? function()
			{
				textBox.innerHTML = '<img src = "' + FILES.loading + '">';
				const DATA = temporary.gender + '\\' + temporary.name + '\\' + temporary.element + '\\' + temporary.dragon;
				sendRequest(DBC_NAMES.addFirstDragon, textBox, DATA, res);
			}:
			function()
			{
				firstAdoption_dialogue(_scene + 1, res)
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
					firstAdoption_dialogue(_scene + 1, res);
				};
				button.onmouseover = function(){button.innerText = res['species list'][i]['text']}
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
			for(let i = 0; i < 2; i++) //cus 2 genders ]:->
			{
				const option = newElement('option', gender);
				option.innerText = res['remaining'][i + 1]['text'];
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
					firstAdoption_dialogue(_scene + 1, res);
				}
			}
		break;
		case 4:
			document.getElementById('gameWindow').removeChild(document.getElementById('leftBreeder'));
			const finish = newElement('button', textBox, 'buttonOk');
			finish.innerText = res['remaining'][0]['text'];
			finish.onclick = function()
			{
				showWindow('castle');
			};
        break;
	}
}