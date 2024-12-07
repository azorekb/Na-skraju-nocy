function treasury_load(_res, _info = null)
{
    windowSettings();
    const gameWindow = document.getElementById('gameWindow');
    if(_info)
    {
        const infoDiv = newElement('div', gameWindow, 'alert');
        infoDiv.innerText = _info.info;
        infoDiv.style.backgroundColor = _info.theStatus ? '#080' : '#800';
    }
    const itemStorage = newElement('div', gameWindow, 'itemsStorage');
    temporary.items = [];
    for(let i = 0; i < _res.length; i++)
    {
        const itemContainter = newElement('div', itemStorage);
        const item = newElement('div', itemContainter, 'item image');
        const text = newElement('span', itemContainter);
        newElement('div', gameWindow, 'optionsList', 'optionsList');

        if(_res[i]['name'])
        {
            item.style.backgroundImage = 'url(img/dragons/' + _res[i]['species'] + '/egg.webp)';
            text.innerText = _res[i]['name'];
            item.oncontextmenu = function(e){treasury_eggClickList(e, _res[i])};
        }
        else
        {
            item.style.backgroundImage = 'url(img/items/' + _res[i]['category'] + '/' + _res[i]['type'] + '.webp)';
            item.oncontextmenu = function(e){treasury_itemClickList(e, _res[i])}
            text.innerText = _res[i]['amount'];
            temporary.items.push([_res[i]['category'], _res[i]['type'], _res[i]['amount']]);
        }
    }
}

function getAmountOfItem(_category, _type)
{
    for(let i = 0; i < temporary.items.length; i++)
        if(temporary.items[i][0] == _category && temporary.items[i][1] == _type)
            return temporary.items[i][2];
    return 0;
}

function treasury_eggClickList(e, egg)
{
    const optionsList = document.getElementById('optionsList');
    optionsList.innerHTML = '';
    optionsList.style.top = e.y - gameWindow.offsetParent.offsetTop + 'px';
    optionsList.style.left = e.x - gameWindow.offsetParent.offsetLeft + 'px';
    for(let i = 0; i < TEXTS.itemList.dragonsEggs.length; i++)
    {
        const option = newElement('div', optionsList, 'option');
        newElement('div', option).innerText = TEXTS.itemList.dragonsEggs[i].optionName[userInfo['language']];
        const subOptions = newElement('div', option, 'none');
        for(let j = 0; j < TEXTS.itemList.dragonsEggs[i].subOptions.length; j++)
        {
            const suboption = newElement('div', subOptions, 'suboption');
            switch(TEXTS.itemList.dragonsEggs[i].subOptions[j].type)
            {
                case 'item':
                    suboption.classList.add('flexbox', 'item');
                    const itemValue = TEXTS.itemList.dragonsEggs[i].subOptions[j].value;
                    newElement('img', suboption).src = 'img/items/' + itemValue[0] + '/' + itemValue[1] + '.webp';
                    const amount = getAmountOfItem(itemValue[0], itemValue[1]);
                    newElement('div', suboption).innerText = amount;
                    // if(amount == 0)
                    //     suboption.classList.add('none');
                    suboption.onclick = function(){dataBaseConnect(DBC_NAMES.connectEgg, optionsList, {id: egg['id'], type: itemValue[1], thename: egg['name'], sex: egg['sex']})}
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