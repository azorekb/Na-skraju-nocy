function settings_load()
{
    windowSettings();
    const gameWindow = document.getElementById('gameWindow');
    const tables = newElement('div', gameWindow, 'flexbox categoryContainer');
    const optionsDiv = newElement('div', gameWindow, 'optionsDiv');
    for(let i = 0; i < TEXTS.userSettings.length; i++)
    {
        const category = newElement('div', tables, 'category');
        category.innerText = TEXTS.userSettings[i].category[userInfo['language']];
        category.onclick = function(){settings_showCategory(i, optionsDiv)}
    }
}

function settings_showCategory(number, div)
{
    div.innerHTML = '';
    for(let i = 0; i < TEXTS.userSettings[number].options.length; i++)
    {
        const theOption = TEXTS.userSettings[number].options[i];
        const label = newElement('label', div);
        label.innerText = theOption.option[userInfo['language']];
        label.htmlFor = 'settings_option_' + i;
        newElement('br', div);
        switch(theOption.type)
        {
            case 'text':
                const inputText = newElement('input', div, '', 'settings_option_' + i);
                inputText.type = 'text';
                if(theOption.limit){inputText.maxLength = theOption.limit;}
                inputText.value = userInfo[theOption.table];
            break;
            case 'select':
                const inputSelect = newElement('select', div, '', 'settings_option_' + i);
                for(let j = 0; j < theOption.values.length; j++)
                {
                    const option = newElement('option', inputSelect);
                    option.value = j;
                    option.innerText = theOption.values[j][userInfo['language']];
                }
                inputSelect.value = userInfo[theOption.table];
            break;
        }
        newElement('br', div);
        if(theOption.hint)
        {
            newElement('sup', div).innerText = theOption.hint[userInfo['language']];
            newElement('br', div);
        }
    }
    const send = newElement('div', div, 'buttonOk');
    send.innerText = TEXTS.send[userInfo['language']];
    send.onclick = function(){changeSettings(number); dataBaseConnect(DBC_NAMES.editSettings, send, number);}
}

function changeSettings(number, res = null)
{
    for(let i = 0; i < TEXTS.userSettings[number].options.length; i++)
    {
        const table = TEXTS.userSettings[number].options[i].table;
        if(res)
            userInfo[table] = res[table];
        else
        {
            const option = document.getElementById('settings_option_' + i);
            if(option.type == 'checkbox')
                userInfo[table] = option.checked ? 1 : 0;
            else
            userInfo[table] = option.value;
        }
    }
}