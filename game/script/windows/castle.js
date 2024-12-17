function castle_load(res)
{
    windowSettings();
    const gameWindow = document.getElementById('gameWindow');
    newElement('p', newElement('div', gameWindow, 'bigName')).innerHTML = res['start buttons'][0]['text'];
    
    const placesContainer = newElement('div', gameWindow, 'placesContainer');
    for(let i = 0; i < res['building list'].length; i++)
    {
        const building = newElement('div', placesContainer, 'place');
        building.innerText = res['building list'][i]['text'];
        building.onclick = function()
        {
            castle_showBuilding(i, res);
        }
    }
}

function castle_showBuilding(building, res)
{
    showWindow();
    windowSettings();
    const gameWindow = document.getElementById('gameWindow');
    newElement('p', newElement('div', gameWindow, 'bigName')).innerHTML = res['building list'][building]['text'];

    const arrows = newElement('div', gameWindow, 'flexbox');
    newElement('div', arrows, 'left arrow image').onclick = function()
    {
        if(building == 0)
            castle_showBuilding(res['building list'].length - 1, res);
        else
            castle_showBuilding(building - 1, res);
    };
    newElement('div', arrows, 'buildingImage image').style.backgroundImage = 'url(img/' + res['buildings'][building]['img'] + '.webp)';
    newElement('div', arrows, 'right arrow image').onclick = function()
    {
        if(building == res['building list'].length - 1)
            castle_showBuilding(0, res);
        else
            castle_showBuilding(building + 1, res);
    };
    const placesContainer = newElement('div', gameWindow, 'placesContainer');
    for(let i = 0; i < res['rooms list'].length; i++)
    {
        if(res['rooms'][i]['building'] == building)
        {
            const room = newElement('div', placesContainer, 'place');
            room.innerText = res['rooms list'][i]['text'];
            room.onclick = function()
            {
                
            }
        }
    }
}