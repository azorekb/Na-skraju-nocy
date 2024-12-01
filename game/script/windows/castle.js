function castle_load()
{
    windowSettings();
    const gameWindow = document.getElementById('gameWindow');
    newElement('p', newElement('div', gameWindow, 'bigName')).innerHTML = TEXTS.start.buttons[2][userInfo.language];
    
    const placesContainer = newElement('div', gameWindow, 'placesContainer');
    for(let i = 0; i < TEXTS.lists.buildings.length; i++)
    {
        const building = newElement('div', placesContainer, 'place');
        building.innerText = TEXTS.lists.buildings[i].building[userInfo.language];
        building.onclick = function()
        {
            castle_showBuilding(i);
        }
    }
}

function castle_showBuilding(building)
{
    showWindow();
    windowSettings();
    const gameWindow = document.getElementById('gameWindow');
    newElement('p', newElement('div', gameWindow, 'bigName')).innerHTML = TEXTS.lists.buildings[building].building[userInfo.language];

    const arrows = newElement('div', gameWindow, 'flexbox');
    newElement('div', arrows, 'left arrow image').onclick = function()
    {
        if(building == 0)
            castle_showBuilding(TEXTS.lists.buildings.length - 1)
        else
            castle_showBuilding(building - 1)
    };
    newElement('div', arrows, 'buildingImage image').style.backgroundImage = 'url(' + TEXTS.lists.buildings[building].img + ')';
    newElement('div', arrows, 'right arrow image').onclick = function()
    {
        if(building == TEXTS.lists.buildings.length - 1)
            castle_showBuilding(0)
        else
            castle_showBuilding(building + 1)
    };
    const placesContainer = newElement('div', gameWindow, 'placesContainer');
    for(let i = 0; i < TEXTS.lists.buildings[building].rooms.length; i++)
    {
        const room = newElement('div', placesContainer, 'place');
        room.innerText = TEXTS.lists.buildings[building].rooms[i][userInfo.language];
        room.onclick = function()
        {
            
        }
    }
}