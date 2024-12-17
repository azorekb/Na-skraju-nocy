function start()
{
	//construct body
	const base = newElement('div', document.body, 'base');
	const mainContainter = newElement('div', base, 'main flexbox');
	const menuBlock = newElement('div', mainContainter, 'menuBlock');
	const userBox = newElement('div', menuBlock);
	const userSettings = newElement('div', userBox, 'flexbox userBox');
	const userContainer = newElement('div', userSettings, 'user');
	newElement('img', userContainer, '', 'avatar');
	const settingsBlock = newElement('div', userSettings, 'settingsBlock');
	newElement('div', settingsBlock, 'settings image').onclick = function(){showWindow('settings')};
	newElement('div', settingsBlock, 'post image').onclick = function(){showWindow('messages')};
	newElement('p', userBox, '', 'username');
	
	const moneyBlock = newElement('div', menuBlock, 'moneyBlock');

	const menuButtons = newElement('div', menuBlock, '', 'menuButtons');
	const mainBlock = newElement('div', mainContainter, 'mainBlock');
	newElement('img', newElement('div', mainBlock, '', 'logo')).src = FILES.logo;
	const gameWindow = newElement('div', newElement('div', mainBlock, 'mainDiv'), '', 'gameWindow');

	sendRequest(DBC_NAMES.loginFirstData, null, gameWindow, {money: moneyBlock, buttons: menuButtons});
}

function changeLanguage(res, divs)
{
	if(divs)
	{
		for(let i = 0; i < res['money'].length; i++)
		{
			const blockDiv = newElement('div', divs.money, 'money flexbox space');
			newElement('div', blockDiv, '', 'moneyName' + i);
			newElement('div', blockDiv, '', 'moneyAmount' + i);
		}

		for(let i = 0; i < res['start buttons'].length; i++)
		{
			const theButton = newElement('div', divs.buttons, 'image listButton button', 'theMainButton' + i);
			theButton.onclick = function(){showWindow(res['windows'][i]['name'])}
			newElement('p', theButton);
		}	
	}

	for(let i = 0; i < res['money'].length; i++)
		document.getElementById('moneyName' + i).innerHTML = res['money'][i]['text'];
	for(let i = 0; i < res['start buttons'].length; i++)
		document.getElementById('theMainButton' + i).childNodes[0].innerText = res['start buttons'][i]['text'];
}

function changeUserIdentify(res)
{
	const AVATAR = res['avatar'];
	const USERNAME = res['username'];
	const NICKNAME = res['nickname'];
	document.getElementById('avatar').src = AVATAR ? AVATAR : FILES.defaultAvatar;
	document.getElementById('username').innerText = NICKNAME ? NICKNAME : USERNAME;
}

function editMoney(money, base)
{
	for(let i = 0; i < money.length; i++)
		document.getElementById('moneyAmount' + i).innerHTML = base['money' + i];
}

function checkTutorialStatus(_res)
{
	switch(_res * 1)
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