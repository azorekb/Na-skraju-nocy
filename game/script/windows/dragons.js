function dragons_load(res)
{
    windowSettings();
    const gameWindow = document.getElementById('gameWindow');
    newElement('p', newElement('div', gameWindow, 'bigName')).innerHTML = TEXTS.dragons.title[userInfo['language']];
    
    const placesContainer = newElement('div', gameWindow, 'placesContainer');
    for(let i = 0; i < res.length; i++)
    {
        const dragon = newElement('div', placesContainer, 'flexbox place space');
        newElement('div', dragon, 'dragon').innerText = res[i]['name'];
        newElement('div', dragon, 'dragon').innerHTML = TEXTS.lists.elements[res[i]['element']].symbol;
        dragon.onclick = function(){dataBaseConnect(DBC_NAMES.specificDragon, gameWindow, res[i]['id']);}
    }
}

function dragons_showDragon(res)
{
    showWindow();
    windowSettings();

    const gameWindow = document.getElementById('gameWindow');
    newElement('p', newElement('div', gameWindow, 'bigName')).innerHTML = res['name'];

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
    for(let i = 0; i < TEXTS.dragons.options.length; i++)
    {
        const option = newElement('div', placesContainer, 'place');
        option.innerText = TEXTS.dragons.options[i][userInfo['language']];
        option.onclick = function(){dragon_dragonOptions(TEXTS.dragons.options[i][ENGLISH], res)}
    }

    dragon_dragonOptions('preview', res);
}

function dragon_dragonOptions(option, res)
{
    const dragonInfo = document.getElementsByClassName('dragonInfo')[0];
    if(option != 'dragon frame')
        dragonInfo.innerHTML = '';
    switch(option)
    {
        case 'preview':
            const img = res['stadium'] * 1 > 0 ? 'img/dragons/' + res['species'] + '/' + res['element'] + '/' + res['stadium'] + '.webp' : 'img/dragons/' + res['species'] + '/egg.webp';
            newElement('div', dragonInfo, 'dragonImage image').style.backgroundImage = 'url(' + img + ')';
            newElement('p', dragonInfo).innerText = TEXTS.lists.species[res['species']].thename[userInfo['language']] + '\n' + TEXTS.lists.elements[res['element']].thename[userInfo['language']] + '\n' + TEXTS.dragons.stats[0][userInfo['language']] + ' ' + res['level'];
        break;
        case 'statistics':
            const table = newElement('table', dragonInfo, 'dragonStats');
            table.insertRow(0).insertCell(0);//.innerText = TEXTS.dragons.stats[0][userInfo['language']] + ': ' + res['level'];
            for(let i = 0; i < TEXTS.dragons.statsDetails.length; i++)
                table.rows[0].insertCell(i + 1).innerText = TEXTS.dragons.statsDetails[i][userInfo['language']];
            for(let i = 1; i < TEXTS.dragons.stats.length; i++)
            {
                const theStat = TEXTS.dragons.stats[i];
                table.insertRow(i).insertCell(0).innerText = theStat[userInfo['language']];
                const diet = res[theStat[ENGLISH]] * 1;
                const train = res[theStat[ENGLISH] + '_train'] * 1;
                const equipment = 0; // later...

                const stone_p = 0; // later...
                const species_p = TEXTS.lists.species[res['species']].stats[i - 1];
                const element_p = TEXTS.lists.elements[res['element']].stats[i - 1];
                
                const base = diet;
                const stone = Math.ceil(base * stone_p / 100);
                const species = Math.ceil(base * species_p / 100);
                const element = Math.ceil(base * element_p / 100);

                table.rows[i].insertCell(1).innerText = diet + train + equipment + stone + species + element;
                table.rows[i].insertCell(2).innerText = diet;
                table.rows[i].insertCell(3).innerHTML = stone;
                table.rows[i].insertCell(4).innerHTML = species;
                table.rows[i].insertCell(5).innerHTML = element;
                table.rows[i].insertCell(6).innerText = train;
                table.rows[i].insertCell(7).innerText = equipment;
            }
        break;
        case 'diet':
            newElement('div', dragonInfo, 'center').innerText = TEXTS.dragons.stats[0][userInfo['language']] + ': ' + res['level'];
            if(res['stadium'] * 1)
            {

            }
            else
            {
                const option = newElement('div', dragonInfo, 'place');
                option.innerText = TEXTS.dragons.care[userInfo['language']];
                option.onclick = function(){dragon_dragonOptions(TEXTS.dragons.care[ENGLISH], res)}
            }
        break;
        case 'care':
            dataBaseConnect(DBC_NAMES.feedDragon, dragonInfo, {food: 0, id: res['id']});
        break;
        case 'dragon frame':
            // window.open('dragon/?id=' + res['id'] + '&language=' + userInfo['language'], '_blank', 'width=378,height=580,location=0,menubar=0,status=0,toolbar=0,resizable=0,location=0');
            const newWindow = window.open('', 'dragon', 'width=378,height=580,location=0,menubar=0,status=0,toolbar=0,resizable=0,location=0');
            newWindow.document.write('<!DOCTYPE html>');
            temporary.newDocument = newWindow.document;
            const html = dragon_newElement('html', newWindow.document);
            const head = dragon_newElement('head', html);
            const body = dragon_newElement('body', html);
            newWindow.document.title = 'Na skraju nocy';
            newWindow.document.characterSet = "utf-8";
            const link = dragon_newElement('link', head);
            link.rel = "stylesheet";
            link.type = "text/css";
            link.media = "screen";
            link.href = "dragon.css";
            //<meta http-equiv="X-UA-Compatible" content="IE=edge">
            const frame = dragon_newElement('div', body, 'frame');
            frame.style.backgroundImage = 'url(img/karta_blank_' + res['frame'] + '.webp)';
            dragon_newElement('div', frame).innerText = res['name'];
            const baseInfo = dragon_newElement('div', frame, 'flexbox');
            dragon_newElement('div', baseInfo).innerText = TEXTS.lists.species[res['species']].thename[userInfo['language']];
            dragon_newElement('div', baseInfo).innerText = TEXTS.lists.elements[res['element']].thename[userInfo['language']];
            const mainDiv = dragon_newElement('div', frame, 'mainDiv');
            const dragonURL = res['stadium'] * 1 ? element.innerText + '/' + res['stadium'] + '.webp' : 'egg.webp';
            mainDiv.style.backgroundImage = 'url(img/dragons/' + res['species'] + '/' + dragonURL + ')';
            mainDiv.style.backgroundSize = 'contain';
            for(let i = 0; i < TEXTS.dragons.frameOptions.length; i = i + 2)
            {
                const option = dragon_newElement('div', frame, 'flexbox');
                dragon_newElement('div', option, 'pointer').innerText = TEXTS.dragons.frameOptions[i][userInfo['language']];
                dragon_newElement('div', option, 'pointer').innerText = TEXTS.dragons.frameOptions[i + 1][userInfo['language']];
            }
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
