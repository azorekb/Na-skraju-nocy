function treasury_load(_res, _info = null)
{
    windowSettings();
    const gameWindow = document.getElementById('gameWindow');
    if(_info)
    {
        const infoDiv = newElement('div', gameWindow, 'alert');
        const a = _info.sex ? 'a' : '';
        infoDiv.innerText = _info.text.replace('[name]', _info.thename).replace('[a]', a);
        infoDiv.style.backgroundColor = _info.theStatus ? '#080' : '#800';
    }
    const itemStorage = newElement('div', gameWindow, 'itemsStorage');
    temporary.items = [];
    for(let i = 0; i < _res['dragons'].length; i++)
    {
        const itemContainter = newElement('div', itemStorage);
        const item = newElement('div', itemContainter, 'item image');
        const text = newElement('span', itemContainter);

        const theDragon = _res['dragons'][i];
        item.style.backgroundImage = 'url(img/dragons/' + theDragon['species'] + '/egg.webp)';
        text.innerText = theDragon['name'];
        item.oncontextmenu = function(e){treasury_eggClickList(e, theDragon, _res)};
    }
    for(let i = 0; i < _res['items'].length; i++)
    {
        const itemContainter = newElement('div', itemStorage);
        const item = newElement('div', itemContainter, 'item image');
        const text = newElement('span', itemContainter);
        
        const theItem = _res['items'][i];
        item.style.backgroundImage = 'url(img/items/' + theItem['itemID'] + '.webp)';
        item.oncontextmenu = function(e){treasury_itemClickList(e, theItem)}
        text.innerText = theItem['amount'];
        temporary.items.push([theItem['itemID'], theItem['amount']]);
    }
    newElement('div', gameWindow, 'optionsList', 'optionsList');
}

function getAmountOfItem(_type)
{
    for(let i = 0; i < temporary.items.length; i++)
        if(temporary.items[i][0] == _type)
            return temporary.items[i][1];
    return 0;
}

function treasury_eggClickList(e, egg, res)
{
    const optionsList = document.getElementById('optionsList');
    optionsList.innerHTML = '';
    optionsList.style.top = e.y - gameWindow.offsetParent.offsetTop + 'px';
    optionsList.style.left = e.x - gameWindow.offsetParent.offsetLeft + 'px';

    for(let i = 0; i < res['egg options'].length; i++)
    {
        const option = newElement('div', optionsList, 'option');
        newElement('div', option).innerText = res['egg options'][i]['text'];
        const subOptions = newElement('div', option, 'none');
        for(let j = 0; j < res['suboptions'].length; j++)
        {
            if(res['suboptions'][j]['option_id'] *1 != i) continue;

            const suboption = newElement('div', subOptions, 'suboption');
            switch(res['suboptions'][j]['type'])
            {
                case 'item':
                    suboption.classList.add('flexbox', 'item');
                    const itemValue = res['suboptions'][j]['value'];
                    newElement('img', suboption).src = 'img/items/' + itemValue + '.webp';
                    const amount = getAmountOfItem(itemValue[0]);
                    newElement('div', suboption).innerText = amount;
                    // if(amount == 0)
                    //     suboption.classList.add('none');
                    suboption.onclick = function(){sendRequest(DBC_NAMES.connectEgg, optionsList, egg['id'] + '\\' + itemValue, {thename: egg['name'], sex: egg['sex'] * 1})}
                break;
            }
        }
        option.onmouseover = function(){subOptions.classList.remove('none');}
        option.onmouseout = function(){subOptions.classList.add('none');}
    }
    e.preventDefault();
}

function treasury_itemClickList(e, item)
{
    const optionsList = document.getElementById('optionsList');
    optionsList.innerHTML = '';
    optionsList.style.top = e.y - gameWindow.offsetParent.offsetTop + 'px';
    optionsList.style.left = e.x - gameWindow.offsetParent.offsetLeft + 'px';
    e.preventDefault();
}