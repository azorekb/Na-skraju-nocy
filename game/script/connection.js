function sendRequest(_onReadyFunction,_url,_sendingData,_functionData = null)
{
	php_request.abort();

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
            
	        if(_functionData == null){_functionData = this.responseText;}
			_onReadyFunction(RES,_functionData);
	    }
	};
    
	php_request.open("POST", _url, true);
	php_request.send(_sendingData);

	numberOfTries = 0;

	requestInterval = window.setInterval(function()
	{
		console.log('próba numer ' + ++numberOfTries + ' - niepowodzenie');

		php_request.abort();

		if(numberOfTries < 3)
		{
			php_request.open("POST", _url, true);
			php_request.send(_sendingData);
		}
		else
		{
			console.log('dupa z tego będzie, reset');
			clearInterval(requestInterval);
		}

	},1000);
}

function editUserValues_connect()
{
	let sendingData = new FormData();
	sendingData.append('columns', 'coppers,silver,gold,username,avatar');
	sendingData.append('table', 'nsn_login');
	sendingData.append('conditions', 'ID');
	
	const DIVS =
	[
		['coppers','silver','gold','username','avatar'],					//0 - res columns
		['coppersAmount','silverAmount','goldAmount','username','avatar'],	//1 - div IDs
		['innerHTML','innerHTML','innerHTML','innerHTML','src']				//2 - what to edit
	];
	
	sendRequest(editUserValues, URL_CONNECTION, sendingData, DIVS);
}

function checkTutorialStatus_connect()
{
	
	let sendingData = new FormData();
	sendingData.append('columns', 'tutorial');
	sendingData.append('table', 'nsn_login');
	sendingData.append('conditions', 'ID');
		
	sendRequest(checkTutorialStatus, URL_CONNECTION, sendingData);
}