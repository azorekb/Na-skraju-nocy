function start()
{
	//construct body
	const base = newElement('div', document.body, 'base');
	const mainContainter = newElement('div', base, 'main');
	const menuBlock = newElement('div', mainContainter, 'menuBlock');
	const userBox = newElement('div', menuBlock);
	const userSettings = newElement('div', userBox, 'flexbox userBox');
	const userContainer = newElement('div', userSettings, 'user');
	newElement('img', userContainer, '', 'avatar');
	const settingsBlock = newElement('div', userSettings, 'settingsBlock');
	newElement('div', settingsBlock, 'settings image').onclick = function(){showWindow('settings')};
	newElement('div', settingsBlock, 'post image').onclick = function(){showWindow('messages')};
	newElement('p', userBox, '', 'username');
	
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

	for(let i = 0; i < TEXTS.start.buttons.length; i++)
	{
		const theButton = newElement('div', menuButtons, 'image listButton', TEXTS.start.buttons[i][ENGLISH]);
		theButton.onclick = function(){showWindow(theButton.id)}
		newElement('p', theButton);
	}

	//test thingies
	const testDiv = newElement('div', mainContainter, 'testDiv');
	newElement('p', testDiv, '', 'testTitle').innerText = test.texts.testTitle[userInfo.language];
	for(let i = 0; i < test.texts.buttons.length; i++)
	{
		const theButton = newElement('div', testDiv, 'image listButton', test.texts.buttons[i][ENGLISH]);
		theButton.onclick = function(){showWindow(theButton.id)}
		newElement('p', theButton);
	}

	changeLanguage(); 												//edit buttons and money namesfrom JSON depends on language
	dataBaseConnect(DBC_NAMES.loginFirstData);						//proccess tutorial if not done
}

function changeLanguage()
{
	for(let i = 0; i < TEXTS.start.money.length; i++)
		document.getElementById(TEXTS.start.money[i][ENGLISH]).innerHTML = TEXTS.start.money[i][userInfo.language];
	for(let i = 0; i < TEXTS.start.buttons.length; i++)
		document.getElementById(TEXTS.start.buttons[i][ENGLISH]).childNodes[0].innerText = TEXTS.start.buttons[i][userInfo.language];

	//test
	document.getElementById('testTitle').innerText = test.texts.testTitle[userInfo.language];
	for(let i = 0; i < test.texts.buttons.length; i++)
		document.getElementById(test.texts.buttons[i][ENGLISH]).childNodes[0].innerText = test.texts.buttons[i][userInfo.language];
}

function changeUserIdentify(res)
{
	const AVATAR = res ? res['avatar'] : userInfo['avatar'];
	const USERNAME = res ? res['username'] : userInfo['username'];
	const NICKNAME = res ? res['nickname'] : userInfo['nickname'];
	document.getElementById('avatar').src = AVATAR ? AVATAR : FILES.defaultAvatar;
	document.getElementById('username').innerText = NICKNAME ? NICKNAME : USERNAME;
}

function editMoney(_res)
{
	for(let i = 0; i < TEXTS.start.money.length; i++)
	{
		const money = TEXTS.start.money[i][ENGLISH];
		document.getElementById(money + 'Amount').innerHTML = _res[money];
	}
}

function checkTutorialStatus(_res)
{
	sessionStorage.setItem('userID', _res['id'] * 1);
	switch(_res['tutorial'] * 1)
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

function numberToBin(number, bin = 2)
{
	let array = [];
	while(number > 0)
	{
		const cell = number % bin;
		array.push(cell);
		number -= cell;
		number /= bin;
	}
	return array;
}