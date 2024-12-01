const wilderness_mapDetails = 
{
    position: [0,0],
    mousePos: [0,0],
    mousedown: false,
    mapMoved: false,
    mouseMove: false,
    mapSize: [1280,789],
    windowSize: [0,0],
    objects: 
    [
        {
            img: 'castle',
            position: [803,321,851,360],
            function: showWindow,
            functionArguments: 'town',
            div: null
        }
    ],
}

function wilderness_load()
{
    const gameWindow = document.getElementById('gameWindow');
    windowSettings(undefined, 370, FILES.wildMap, [-600,-200], 'relative');
    newElement('span', gameWindow, 'positionText', 'positionText');
    for(let i = 0; i < wilderness_mapDetails.objects.length; i++)
    {
        const theObject = wilderness_mapDetails.objects[i]
        theObject.div = newElement('div', gameWindow, 'wildObject');
        theObject.div.style.backgroundImage = 'url(img/' + theObject.img + '.webp)';
        theObject.div.onmouseover = function(){theObject.div.style.backgroundImage = 'url(img/' + theObject.img + '_active.webp)'}
        theObject.div.onmouseout = function(){theObject.div.style.backgroundImage = 'url(img/' + theObject.img + '.webp)'}
        theObject.div.onclick = function(){wilderness_mapClick(theObject)}
        wilderness_showObject(theObject);
    }
    
    gameWindow.onmousedown = function(e){wilderness_mapGrab(e)};
    // gameWindow.onclick = function(e){wilderness_mapClick()};
    gameWindow.onmousemove = function(e){wilderness_mouseOnMapMove(e)};
}

function wilderness_showObject(theObject)
{
    const gameWindow = document.getElementById('gameWindow');
    const mapBorderLeft = -1 * gameWindow.style.backgroundPositionX.slice(0,-2);
    const mapBorderRight = mapBorderLeft + gameWindow.style.width.slice(0,-2) * 1;
    const mapBorderTop = -1 * gameWindow.style.backgroundPositionY.slice(0,-2);
    const mapBorderBottom = mapBorderTop + gameWindow.style.height.slice(0,-2) * 1;
    
    let objectBGPosX = 0;
    let objectBGPosY = 0;
    let objectPositionX = theObject.position[0] - mapBorderLeft;
    let objectPositionY = theObject.position[1] - mapBorderTop;
    
    let objectSizeX = theObject.position[2] - theObject.position[0];
    if(theObject.position[2] > mapBorderRight)
        objectSizeX = mapBorderRight - theObject.position[0];
    if(theObject.position[0] >= mapBorderRight)
        objectSizeX = 0;

    if(theObject.position[0] < mapBorderLeft)
    {
        objectSizeX = theObject.position[2] - mapBorderLeft;
        objectBGPosX = theObject.position[0] - mapBorderLeft;
        objectPositionX = 0;
    }
    if(theObject.position[2] <= mapBorderLeft)
        objectSizeX = 0;
    
    let objectSizeY = theObject.position[3] - theObject.position[1];
    if(theObject.position[3] > mapBorderBottom)
        objectSizeY = mapBorderBottom - theObject.position[1];
    if(theObject.position[1] >= mapBorderBottom)
        objectSizeY = 0;

    if(theObject.position[1] < mapBorderTop)
    {
        objectSizeY = theObject.position[3] - mapBorderTop;
        objectBGPosY = theObject.position[1] - mapBorderTop;
        objectPositionY = 0;
    }
    if(theObject.position[3] <= mapBorderTop)
        objectSizeY = 0;

    theObject.div.style.width = objectSizeX + 'px';
    theObject.div.style.height = objectSizeY + 'px';
    
    theObject.div.style.backgroundPositionX = objectBGPosX + 'px';
    theObject.div.style.backgroundPositionY = objectBGPosY + 'px';
    theObject.div.style.left = objectPositionX + 'px';
    theObject.div.style.top = objectPositionY + 'px';
}

function wilderness_mapGrab(e)
{
    const gameWindow = document.getElementById('gameWindow');
    wilderness_mapDetails.mousedown = true;
    wilderness_mapDetails.mapMoved = false;
    wilderness_mapDetails.mousePos = [e.clientX,e.clientY];
    wilderness_mapDetails.position = [gameWindow.style.backgroundPositionX.slice(0,-2), gameWindow.style.backgroundPositionY.slice(0,-2)];
    e.preventDefault();
}

function wilderness_mapClick(OBJECT)
{
    if(wilderness_mapDetails.mapMoved == false && OBJECT.div.style.width.slice(0,-2) *1 > 0 && OBJECT.div.style.height.slice(0,-2) *1 > 0)
    {
        const FUNCTION = OBJECT.function;
        const ARGUMENTS = OBJECT.functionArguments;
        FUNCTION(ARGUMENTS);
    }
}

function wilderness_mouseOnMapMove(e)
{
    const gameWindow = document.getElementById('gameWindow');
    wilderness_mapDetails.mouseMove = true;

    if(wilderness_mapDetails.mousedown == false)
    {
        const X = e.x - gameWindow.style.backgroundPositionX.slice(0,-2) - gameWindow.offsetParent.offsetLeft - gameWindow.offsetParent.clientLeft;
        const Y = e.y - gameWindow.style.backgroundPositionY.slice(0,-2) - gameWindow.offsetParent.offsetTop - gameWindow.offsetParent.clientTop;
        document.getElementById('positionText').innerHTML = Math.floor(X / 10)  + '/' + Math.floor(Y / 10);
    }
}

function wilderness_mapMove(e)
{
    wilderness_mapDetails.mouseMove = false;

    if(wilderness_mapDetails.mousedown)
    {
        const gameWindow = document.getElementById('gameWindow');
        wilderness_mapDetails.mapMoved = true;
        wilderness_mapDetails.windowSize[0] = gameWindow.clientWidth - wilderness_mapDetails.mapSize[0];
        wilderness_mapDetails.windowSize[1] = gameWindow.clientHeight - wilderness_mapDetails.mapSize[1];
        let newPos = [wilderness_mapDetails.position[0] - wilderness_mapDetails.mousePos[0] + e.clientX, wilderness_mapDetails.position[1] - wilderness_mapDetails.mousePos[1] + e.clientY];
        if(newPos[0] > 0) newPos[0] = 0;
        if(newPos[0] < wilderness_mapDetails.windowSize[0]) newPos[0] = wilderness_mapDetails.windowSize[0];
        if(newPos[1] > 0) newPos[1] = 0;
        if(newPos[1] < wilderness_mapDetails.windowSize[1]) newPos[1] = wilderness_mapDetails.windowSize[1];
        gameWindow.style.backgroundPosition = newPos[0] + "px " + newPos[1] + "px";

        for(let i = 0; i < wilderness_mapDetails.objects.length; i++)
            wilderness_showObject(wilderness_mapDetails.objects[i]);
    }
}

function wilderness_mapRelease()
{
    wilderness_mapDetails.mousedown = false;
}