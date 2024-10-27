function start()
{
	const CHANGE_IDS = ['coppers','silver','gold','dragons','treasury','willageMap','wilderness'];
	for(let i = 0; i < CHANGE_IDS.length; i++)
		document.getElementById(CHANGE_IDS[i]).innerHTML = TEXTS.start[i][POLISH];

	let sending_data = new FormData();
    sending_data.append('columns', 'coppers,silver,gold,username,avatar');
    sending_data.append('table', 'nsn_login');
    sending_data.append('conditions', 'ID');
    const URL = 'script/php/connect.php';

	const DIVS =
	[
		['coppers','silver','gold','username','avatar'],
		['coppersAmount','silverAmount','goldAmount','username','avatar'],
		['innerHTML','innerHTML','innerHTML','innerHTML','src']
	];

	sendRequest(editValues,URL, sending_data, DIVS);
}

function editValues(_res, _divs)
{
	for(let i = 0; i < _divs[0].length; i++)
	{
		switch(_divs[2][i])
		{
			case 'innerHTML': document.getElementById(_divs[1][i]).innerHTML = _res['res'][0][_divs[0][i]]; break;
			case 'src': document.getElementById(_divs[1][i]).src = 'img/avatars/' + _res['res'][0][_divs[0][i]]; break;
		}
	}
}