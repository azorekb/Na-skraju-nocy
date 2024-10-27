function sendRequest(_onReadyFunction,_url,_sendingData,_functionData)
{
	php_request.abort();

	php_request.onerror = function()
	{
		// errorsLog.innerHTML = this.status + this.statusText;
		console.log(this.status,this.statusText);
	}
	php_request.onreadystatechange = function() 
	{
		console.log(this.readyState,this.status);
        if(this.readyState == 4 && this.status == 200)
		{
			clearInterval(requestInterval);

            console.log(this.responseText);
			// errorsLog.innerHTML = '' + this.responseText;
	        const RES = JSON.parse(this.responseText);
			console.log(RES);
            
	        if(_functionData == 'giveMeResText'){_functionData = this.responseText;}
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
