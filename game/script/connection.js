function sendRequest(_what, _sendingData, _info = null)
{
	const URL = 'php/connect.php';

	php_request.abort();
	if(requestInterval)
		clearInterval(requestInterval);

	php_request.onerror = function()
	{
		console.log(this.status,this.statusText);
	}
	php_request.onreadystatechange = function() 
	{
		console.log(this.readyState,this.status);
        if(this.readyState == 4 && this.status == 200)
		{
			clearInterval(requestInterval);

            console.log(this.responseText);
			const RESPONSE = JSON.parse(this.responseText);
	        const RES = RESPONSE['res'];
			console.log(RES);
			if(RESPONSE['error'])
			{
				console.log(RESPONSE['error']);
				switch(RESPONSE['error'])
				{
					case 'session ended': location.assign('http://naskrajunocy.ugu.pl/?action=login&error=4'); break;
				}
				return;
			}

			let theText = '';
			switch(RESPONSE['status'])
			{
				case 'success': theText = 'success'; break;
				case 'no dragon': theText = _info.thename + TEXTS.connectionStatus.noDragons[userInfo.language]; break;
				case 'no stone': theText = TEXTS.connectionStatus.noStone[userInfo.language]; break;
			}

			switch(_what)
			{
				case 0: 
					editMoney(RES[0]);
					changeSettings(0, RES[0]);
					changeUserIdentify(RES[0]);
					changeLanguage();
					checkTutorialStatus(RES[0]);
				break;
				case 1:
					tutorial = 2;
					firstAdoption_dialogue(6);
				break;
				case 2:
					treasury_load(RES, _info);
				break;
				case 3:
					const genderEnd = TEXTS.genderEnds[userInfo.language][_info.sex];
					let theStatus = 0;
					if(theText == 'success')
					{
						theText = TEXTS.connectionStatus.successConnectDragon[userInfo.language].replace('[name]', _info.thename).replace('[a]', genderEnd);
						theStatus = 1;
					}
					showWindow('treasury', {info: theText, theStatus: theStatus});
				break;
				case 4:
					changeSettings(0, RES[0]);
					changeUserIdentify(RES[0]);
					changeLanguage();
					showWindow('settings');
				break;

				//test
				case 't1':
					test_users(RES);
				break;
			}
				
	    }
	};
    
	php_request.open("POST", URL, true);
	php_request.send(_sendingData);

	numberOfTries = 0;

	requestInterval = window.setInterval(function()
	{
		console.log('próba numer ' + ++numberOfTries + ' - niepowodzenie');

		php_request.abort();

		if(numberOfTries < 3)
		{
			php_request.open("POST", URL, true);
			php_request.send(_sendingData);
		}
		else
		{
			console.log('dupa z tego będzie, reset');
			clearInterval(requestInterval);
		}

	},1000);
}

const DBC_NAMES = 
{
	loginFirstData: 0,
	addFirstDragon: 1,
	listOfItems: 2,
	connectEgg: 3,
	editSettings: 4
}

function dataBaseConnect(_what, _div = null, _options = null)
{
	if(_div)
		_div.innerHTML = '<img src = "' + FILES.loading + '">';

	const SENDING_DATA = 
	{
		target: 'target',
		columns: 'columns',
		table: 'table',
		conditions: 'conditions',
		values: 'values',
		error: 'error'
	}
	const DB =
	{
		login: 'nsn_login',
		dragons: 'nsn_dragons',
		items: 'nsn_items'
	}
	let sendingData = new FormData();
	const userID = sessionStorage.getItem('userID');
	const stoneCategory = getItemCategoryIdByName('philosopher\'s stones');
	const regularStone = getItemTypeIdByName('regular philosopher\'s stone');
	switch(_what)
	{
		case 0:
			sendingData.append(SENDING_DATA.target, 'select');
			sendingData.append(SENDING_DATA.columns, 'coppers, silver, gold, username, avatar, tutorial, id, nickname, language');
			sendingData.append(SENDING_DATA.table, DB.login);
			sendingData.append(SENDING_DATA.conditions, 'ID');
		break;
		case 1:
			sendingData.append(SENDING_DATA.target, 'chechk\\add\\add\\edit');
			sendingData.append(SENDING_DATA.table, DB.login + '\\' + DB.dragons + '\\' + DB.items + '\\' + DB.login);
			sendingData.append(SENDING_DATA.columns, 'tutorial\\sex, name, owner, element, species\\userID, category, type, amount\\null');
			sendingData.append(SENDING_DATA.values,'null\\' + 
				temporary.gender + ',"' + temporary.name + '",' + userID + ',' + temporary.element + ',' + temporary.dragon + '\\' +
				userID + ',' + stoneCategory + ',' + regularStone + ',' + TEXTS.firstAdoption.starterStonesAmount + '\\' +
				'tutorial = 1'
			);
			sendingData.append('conditions', 'id = ' + userID + ' and tutorial = 0\\null\\null\\id = ' + userID);
		break;
		case 2:
			sendingData.append(SENDING_DATA.target, 'select\\select');
			sendingData.append(SENDING_DATA.columns, 'name, species, id, sex\\category, type, amount');
			sendingData.append(SENDING_DATA.table, DB.dragons + '\\' + DB.items);
			sendingData.append(SENDING_DATA.conditions, 'owner = ' + userID + ' and stone = 0\\userID = ' + userID);
		break;
		case 3:
			sendingData.append(SENDING_DATA.target, 'check\\check\\edit\\edit');
			sendingData.append(SENDING_DATA.table, DB.dragons + '\\' + DB.items + '\\' + DB.dragons + '\\' + DB.items)
			sendingData.append(SENDING_DATA.columns, 'stone\\amount\\null\\null');
			sendingData.append(SENDING_DATA.values, 'null\\null\\stone = ' + _options.type + '\\amount = amount - 1')
			sendingData.append(SENDING_DATA.conditions,'id = ' + _options.id + ' and stone = 0\\userID = ' + userID + ' and category = ' + stoneCategory + ' and type = ' + _options.type + ' and amount >= 1\\id = ' + _options.id + '\\userID = ' + userID + ' and category = ' + stoneCategory + ' and type = ' + _options.type);
			sendingData.append(SENDING_DATA.error, 'no dragon\\no stone\\null\\null');
		break;
		case 4:
			sendingData.append(SENDING_DATA.target, 'edit');
			sendingData.append(SENDING_DATA.table, DB.login);
			let values = '';
			console.log('_options: ' + _options);
			console.log(TEXTS.userSettings[_options].options);
			for(let i = 0; i < TEXTS.userSettings[_options].options.length; i++)
			{
				const option = TEXTS.userSettings[_options].options[i];
				const input = document.getElementById('settings_option_' + i);
				let optionValue;
				switch(option.type)
				{
					case 'text': optionValue = '"' + input.value + '"'; break;
					case 'checkbox': optionValue = input.checked ? 1 : 0; break;
					default: optionValue = input.value;
				}

				if(i > 0)
					values += ', ';
				values += option.table + ' = ' + optionValue;
				console.log(option.table + ' = ' + optionValue)
			}
			console.log('value = ' + values);
			sendingData.append(SENDING_DATA.values, values);
			sendingData.append(SENDING_DATA.conditions,'ID');
		break;

		//test
		case 't1':
			sendingData.append(SENDING_DATA.target, 'select');
			sendingData.append(SENDING_DATA.columns, 'username, nickname, avatar, coppers, silver, gold, language');
			sendingData.append(SENDING_DATA.table, DB.login);
			sendingData.append(SENDING_DATA.conditions, '1');
		break;
	}
	
	sendRequest(_what, sendingData, _options);
}