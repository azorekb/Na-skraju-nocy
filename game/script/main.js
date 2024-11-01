function start()
{
	for(let i = 0; i < TEXTS.start.money.length; i++)	//edit money names from JSON depends on language
		document.getElementById(TEXTS.start.money[i][ENGLISH]).innerHTML = TEXTS.start.money[i][currentLanguage];

	for(let i = 0; i < TEXTS.start.buttons.length; i++)	//edit buttons namesfrom JSON depends on language
	{
		let theButton = document.createElement('div');
		theButton.id = TEXTS.start.buttons[i][ENGLISH];
		theButton.onclick = function(){showWindow(theButton.id)}
		document.getElementById('menuButtons').appendChild(theButton);
		let textArea = document.createElement('p');
		textArea.innerHTML = TEXTS.start.buttons[i][currentLanguage];
		theButton.appendChild(textArea);
	}

	checkTutorialStatus_connect();						//proccess tutorial if not done
}

function editUserValues(_res, _divs)
{
	for(let i = 0; i < _divs[0].length; i++)
	{
		switch(_divs[2][i])
		{
			case 'innerHTML': document.getElementById(_divs[1][i]).innerHTML = _res[0][_divs[0][i]]; break;
			case 'src': document.getElementById(_divs[1][i]).src = 'img/avatars/' + _res[0][_divs[0][i]]; break;
		}
	}
}

function checkTutorialStatus(_res, _)
{
	switch(_res[0]['tutorial'] * 1)
	{
		case 0: showWindow('firstAdoption'); break;
	}

	editUserValues_connect(); 							//edit base user info from MySQL
}