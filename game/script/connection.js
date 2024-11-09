function sendRequest(_what, _sendingData)
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
	        const RES = JSON.parse(this.responseText)['res'];
			console.log(RES);
			if(RES['error'])
			{
				console.log(RES['error']);
				return;
			}
            
			switch(_what)
			{
				case 0: 
					editUserValues(RES);
					checkTutorialStatus(RES);
				break;
				case 1:
					tutorial = 2;
					dialogue('firstAdoption', 6);
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
	addFirstDragon: 1
}

function dataBaseConnect(_what)
{
	const SENDING_DATA = 
	{
		target: 'target',
		columns: 'columns',
		table: 'table',
		conditions: 'conditions',
		values: 'values'
	}
	let sendingData = new FormData();
	const userID = sessionStorage.getItem('userID');
	switch(_what)
	{
		case 0:
			sendingData.append(SENDING_DATA.target, 'select');
			sendingData.append(SENDING_DATA.columns, 'coppers, silver, gold, username, avatar, tutorial, id');
			sendingData.append(SENDING_DATA.table, 'nsn_login');
			sendingData.append(SENDING_DATA.conditions, 'ID');
		break;
		case 1:
			sendingData.append(SENDING_DATA.target, 'add\\add\\edit');
			sendingData.append(SENDING_DATA.table, 'nsn_dragons\\nsn_items\\nsn_login');
			sendingData.append(SENDING_DATA.columns, 'sex, name, owner, element, species\\userID, category, type, amount\\null');
			sendingData.append(SENDING_DATA.values, 
				temporary.gender + ',"' + temporary.name + '",' + userID + ',' + temporary.element + ',' + temporary.dragon + '\\' +
				userID + ',' + getItemCategoryIdByName('philosopher\'s stones') + ',' + getItemTypeIdByName('regular philosopher\'s stone') + ',' + TEXTS.firstAdoption.starterStonesAmount + '\\' +
				'tutorial = 1'
			);
			sendingData.append('conditions', 'null\\null\\id = ' + userID);
		break;
	}
	
	sendRequest(_what, sendingData);
}