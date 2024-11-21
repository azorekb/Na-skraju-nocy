function start()
{
	//construct body
	const base = newElement('div', document.body, 'base');
	const mainContainter = newElement('div', base, 'main');
	const menuBlock = newElement('div', mainContainter, 'menuBlock');
	const userContainer = newElement('div', menuBlock, 'user');
	newElement('img', userContainer, '', 'avatar');
	newElement('p', userContainer, '', 'username');
	const moneyBlock = newElement('div', menuBlock, 'moneyBlock')
	for(let i = 0; i < TEXTS.start.money.length; i++)
	{
		const blockDiv = newElement('div', moneyBlock, 'money');
		newElement('div', blockDiv, '', TEXTS.start.money[i][ENGLISH]);
		newElement('div', blockDiv, '', TEXTS.start.money[i][ENGLISH] + 'Amount');
	}
	const menuButtons = newElement('div', menuBlock, '', 'menuButtons');
	const mainBlock = newElement('div', mainContainter, 'mainBlock');
	newElement('img', newElement('div', mainBlock, '', 'logo')).src = FILES.logo;
	newElement('div', newElement('div', mainBlock, 'mainDiv'), '', 'gameWindow')

	for(let i = 0; i < TEXTS.start.money.length; i++)	//edit money names from JSON depends on language
		document.getElementById(TEXTS.start.money[i][ENGLISH]).innerHTML = TEXTS.start.money[i][currentLanguage];

	for(let i = 0; i < TEXTS.start.buttons.length; i++)	//edit buttons namesfrom JSON depends on language
	{
		const theButton = newElement('div', menuButtons, 'image', TEXTS.start.buttons[i][ENGLISH]);
		theButton.onclick = function(){showWindow(theButton.id)}
		newElement('p', theButton).innerHTML = TEXTS.start.buttons[i][currentLanguage];
	}

	dataBaseConnect(DBC_NAMES.loginFirstData);						//proccess tutorial if not done
}

function editUserValues(_res)
{
	const DIVS =
	[
		['coppers','silver','gold','username','avatar'],					//0 - res columns
		['coppersAmount','silverAmount','goldAmount','username','avatar'],	//1 - div IDs
		['innerHTML','innerHTML','innerHTML','innerHTML','src']				//2 - what to edit
	]

	for(let i = 0; i < DIVS[0].length; i++)
	{
		switch(DIVS[2][i])
		{
			case 'innerHTML': document.getElementById(DIVS[1][i]).innerHTML = _res[0][DIVS[0][i]]; break;
			case 'src': document.getElementById(DIVS[1][i]).src = _res[0][DIVS[0][i]]; break;
		}
	}
}

function checkTutorialStatus(_res)
{
	sessionStorage.setItem('userID', _res[0]['id'] * 1);
	switch(_res[0]['tutorial'] * 1)
	{
		case 0: showWindow('firstAdoption'); break;
	}
}

function newElement(_what, _where, _class = '', _id = '')
{
	let div = document.createElement(_what);
	if(_class != '')
	{
		_class = _class.split(' ');
		for(let i = 0; i < _class.length; i++)
		{
			div.classList.add(_class[i]);
		}
	}
	if(_id != ''){div.id = _id;}
	if(_where != null){_where.appendChild(div);}
	return div;
}
