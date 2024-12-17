function dragons_load(res)
{
    windowSettings();
    const gameWindow = document.getElementById('gameWindow');
    newElement('p', newElement('div', gameWindow, 'bigName')).innerHTML = res['remaining'][0]['text'];
    
    const placesContainer = newElement('div', gameWindow, 'placesContainer');
    for(let i = 0; i < res['dragons'].length; i++)
    {
        const dragon = newElement('div', placesContainer, 'flexbox place space');
        const dragonRes = res['dragons'][i];
        newElement('div', dragon, 'dragon').innerText = dragonRes['name'];
        newElement('div', dragon, 'dragon').innerHTML = dragonRes['symbol'];
        dragon.onclick = function(){sendRequest(DBC_NAMES.specificDragon, gameWindow, dragonRes['id']);}
    }
}

function dragons_showDragon(res, info)
{
    showWindow();
    windowSettings();
    const gameWindow = document.getElementById('gameWindow');
    if(info?.text)
    {
        const infoDiv = newElement('div', gameWindow, 'alert');
        const y = ['y', 'a'];
        infoDiv.innerText = info.text.replace('[time]', info.time).replace('[name]', res['main'][0]['name']).replace('[y]', y[res['main'][0]['sex']]);
        infoDiv.style.backgroundColor = info.theStatus ? '#080' : '#800';
    }

    newElement('p', newElement('div', gameWindow, 'bigName')).innerHTML = res['main'][0]['name'];
    const arrows = newElement('div', gameWindow, 'flexbox');
    // newElement('div', arrows, 'left arrow image').onclick = function()
    // {
    //     if(building == 0)
    //         castle_showBuilding(TEXTS.lists.buildings.length - 1)
    //     else
    //         castle_showBuilding(building - 1)
    // };
    newElement('div', arrows, 'dragonInfo');
    // newElement('div', arrows, 'right arrow image').onclick = function()
    // {
    //     if(building == TEXTS.lists.buildings.length - 1)
    //         castle_showBuilding(0)
    //     else
    //         castle_showBuilding(building + 1)
    // };
    const placesContainer = newElement('div', gameWindow, 'placesContainer');
    for(let i = 0; i < res['dragon options'].length; i++)
    {
        const option = newElement('div', placesContainer, 'place');
        option.innerText = res['dragon options'][i]['text'];
        option.onclick = function(){dragon_dragonOptions(res['options'][i]['name'], res)}
    }

    dragon_dragonOptions('preview', res);
}

function dragon_dragonOptions(option, res)
{
    const dragonInfo = document.getElementsByClassName('dragonInfo')[0];
    if(option != 'dragon frame')
        dragonInfo.innerHTML = '';

    const stadium = res['main'][0]['stadium'] * 1;
    const species = res['main'][0]['species'] * 1;
    const element = res['main'][0]['element'] * 1;
    const level = res['main'][0]['level'] * 1;
    const care_text = res['remaining'][0]['text'];
    const level_text = res['remaining'][1]['text'];

    switch(option)
    {
        case 'preview':
            
            const img = stadium * 1 > 0 ? 'img/dragons/' + species + '/' + element + '/' + stadium + '.webp' : 'img/dragons/' + species + '/egg.webp';
            newElement('div', dragonInfo, 'dragonImage image').style.backgroundImage = 'url(' + img + ')';
            newElement('p', dragonInfo).innerText = res['species list'][species]['text'] + '\n' + res['elements list'][element]['text'] + '\n' + level_text + ' ' + level;
        break;
        case 'statistics':
            let diet = [], train = [], stone = [];
            const s_species = res['species'][species]['stats'].split(',');
            const s_element = res['elements'][element]['stats'].split(',');
            for(let i = 0; i < res['dragon stats'].length; i++){diet[i] = 0; train[i] = 0; stone[i] = 0;}
            for(let i = 0; i < res['stats'].length; i++)
            {
                const theStat = res['stats'][i]['stat'] * 1;
                const theValue = res['stats'][i]['value'] * 1;
                switch(res['stats'][i]['type'] * 1)
                {
                    case 0: diet[theStat] = theValue; break;
                    case 1: train[theStat] = theValue; break;
                    case 2: stone[theStat] = theValue; break;
                }
            }
            const table = newElement('table', dragonInfo, 'dragonStats');
            table.insertRow(0).insertCell(0);
            for(let i = 0; i < res['dragon stats details'].length; i++)
            {
                table.rows[0].insertCell(i + 1).innerText = res['dragon stats details'][i]['text'];
            }
            for(let i = 0; i < res['dragon stats'].length; i++)
            {
                
                table.insertRow(i + 1).insertCell(0).innerText = res['dragon stats'][i]['text'];
                
                const equipment = 0; // later...
                const species_p = s_species[i];
                const element_p = s_element[i];
                const stone_p = stone[i];
                
                const base = diet[i];
                const stone_v = stone_p > 0 ? Math.floor(base * stone_p / 100) : Math.ceil(base * stone_p / 100);
                const species_v = species_p > 0 ? Math.floor(base * species_p / 100) : Math.ceil(base * species_p / 100);
                const element_v = element_p > 0 ? Math.floor(base * element_p / 100) : Math.ceil(base * element_p / 100);

                table.rows[i + 1].insertCell(1).innerText = diet[i] + train[i] + equipment + stone_v + species_v + element_v;
                table.rows[i + 1].insertCell(2).innerText = diet[i];
                table.rows[i + 1].insertCell(3).innerHTML = stone_v;
                table.rows[i + 1].insertCell(4).innerHTML = species_v;
                table.rows[i + 1].insertCell(5).innerHTML = element_v;
                table.rows[i + 1].insertCell(6).innerText = train[i];
                table.rows[i + 1].insertCell(7).innerText = equipment;
            }
        break;
        case 'diet':
            newElement('div', dragonInfo, 'center').innerText = level_text + ': ' + level;
            if(stadium)
            {

            }
            else
            {
                const option = newElement('div', dragonInfo, 'place');
                option.innerText = care_text;
                option.onclick = function(){sendRequest(DBC_NAMES.warmDragon, dragonInfo, '' + res['main'][0]['id'])}
            }
        break;
        case 'dragon frame':
            console.log('eee yes');
            window.open('dragon/?id=' + res['main'][0]['id'], 'dragonFrame', 'width=378,height=580,location=0,menubar=0,status=0,toolbar=0,resizable=0,location=0');
        break;
    }
}

function dragon_newElement(_what, _where, _class = '', _id = '')
{
    let div = temporary.newDocument.createElement(_what);
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
