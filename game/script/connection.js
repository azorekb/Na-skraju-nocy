const DBC_NAMES = 
{
	loginFirstData: 0,
	addFirstDragon: 1,
	listOfItems: 2,
	connectEgg: 3,
	editSettings: 4,
	listOfDragons: 5,
	specificDragon: 6,
	warmDragon: 7,
	firstAdoptionDialogue: 8,
	buildingList: 9,
	wildernessData: 10,
	wildernessTravelData: 11,
	settingsOptions: 12,
}

function sendRequest(_what, _div, _data = '', _info = null)
{
	if(_div)
		_div.innerHTML = '<img src = "' + FILES.loading + '">';

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
	        const RES = RESPONSE['result'];
			console.log(RES);
			if(RESPONSE['error'])
			{
				if(RESPONSE['error'] == 'session ended')
					location.assign('http://naskrajunocy.ugu.pl/?action=login&error=4');
				else
					_div.innerText = RESPONSE['error'];
				return;
			}

			switch(_what)
			{
				case 0: 
					// changeSettings(0, RES[0]);
					changeUserIdentify(RES['base'][0]);
					changeLanguage(RES, _info);
					checkTutorialStatus(RES['base'][0]['tutorial']);
					editMoney(RES['money'], RES['base'][0]);
				break;
				case 1:
					tutorial = 2;
					firstAdoption_dialogue(6, _info);
				break;
				case 2: treasury_load(RES, _info); break;
				case 3: sendRequest(DBC_NAMES.listOfItems, _div, null, {theStatus: RES['success'], text: RES['connection status'][0]['text'], thename: _info.thename, sex: _info.sex}); break;				break;
				case 4:
					changeUserIdentify(RES['base'][0]);
					changeLanguage(RES, _info);
					showWindow('settings');
				break;
				case 5: dragons_load(RES); break;
				case 6: dragons_showDragon(RES, _info); break;
				case 7: sendRequest(DBC_NAMES.specificDragon, _div, RES['dragon'][0]['id'], {theStatus: RES['success'], text: RES['connection status'][0]['text'], time: RES['dragon'][0]['timeleft']}); break;
				case 8: firstAdoption_load(RES); break;
				case 9: castle_load(RES); break;
				case 10: wilderness_load(RES); break;
				case 11: wilderenss_showTravel(_info, RES); break;
				case 12: settings_load(RES); break;
			}
				
	    }
	};

    let sendingData = new FormData();
	sendingData.append('what', _what);
	sendingData.append('data', _data);
	php_request.open("POST", URL, true);
	php_request.send(sendingData);

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