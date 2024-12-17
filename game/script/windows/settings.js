function settings_load(res)
{
    windowSettings();
    const gameWindow = document.getElementById('gameWindow');
    const tables = newElement('div', gameWindow, 'flexbox categoryContainer');
    const optionsDiv = newElement('div', gameWindow, 'optionsDiv');
    for(let i = 0; i < res['settings categories'].length; i++)
    {
        const category = newElement('div', tables, 'category');
        category.innerText = res['settings categories'][i]['text'];
        category.onclick = function(){settings_showCategory(i, optionsDiv, res)}
    }
}

function settings_showCategory(number, div, res)
{
    div.innerHTML = '';
    temporary.changed = [];
    for(let i = 0; i < res['settings'].length; i++)
    {
        temporary.changed[i] = {changed:false, table: null, value: null};
        if(res['settings'][i]['category'] == number)
        {
            const theOption = res['settings'][i];
            const label = newElement('label', div);
            label.innerText = res['settings options'][i]['text'];
            label.htmlFor = 'settings_option_' + i;
            newElement('br', div);
            temporary.changed[i].table = theOption['table'];
            switch(theOption['type'])
            {
                case 'text':
                    const inputText = newElement('input', div, '', 'settings_option_' + i);
                    inputText.type = 'text';
                    if(theOption['limit']){inputText.maxLength = theOption['limit'];}
                    inputText.value = res['user'][0][theOption.table];
                    inputText.onchange = function(){settings_change(i, inputText.value)};
                break;
                case 'select':
                    const inputSelect = newElement('select', div, '', 'settings_option_' + i);
                    for(let j = 0; j < res['settings select value'].length; j++)
                    {
                        if(res['settings select value'][j]['number'] == theOption['values_id'])
                        {
                            const option = newElement('option', inputSelect);
                            option.value = j;
                            option.innerText = res['settings select value'][j]['text'];
                        }
                    }
                    inputSelect.value = res['user'][0][theOption.table];
                    inputSelect.onchange = function(){settings_change(i, inputSelect.value)};
                break;
            }
            newElement('br', div);
            for(let j = 0; j < res['settings hints'].length; j++)
            {
                if(res['settings hints'][j]['number'] == theOption['hint_id'])
                {
                    newElement('sup', div).innerText = res['settings hints'][j]['text'];
                    newElement('br', div);
                }
            }
        }
    }
    const send = newElement('div', div, 'buttonOk');
    send.innerText = res['remaining'][0]['text'];
    send.onclick = function(){changeSettings(number);}
}

function settings_change(n, value)
{
    temporary.changed[n].changed = true;
    temporary.changed[n].value = value;
}

function changeSettings(number)
{
    let data = '';
    for(let i = 0; i < temporary.changed.length; i++)
    {
        if(temporary.changed[i].changed)
        {
            if(data != '')
                data += ', ';
            data += temporary.changed[i].table + ' = \'' + temporary.changed[i].value + '\'';
        }
    }
    if(data == '') return;

    let db_table = '';
    switch(number)
    {
        case 0: db_table = 'nsn_login'; break;
    }
    console.log(data)
    sendRequest(DBC_NAMES.editSettings, document.getElementById('gameWindow'), data + '\\' + db_table);
}