const wilderness_mapDetails = 
{
    position: [0,0],
    mousePos: [0,0],
    mousedown: false,
    mapMoved: false,
    mouseMove: false,
    mapSize: [1280,789],
    windowSize: [0,0],
    activeObject: -1,
    objects: 
    [
        {
            img: 'castle',
            position: [803,321,851,360],
            function: showWindow,
            functionArguments: 'castle',
            div: null
        }
    ],
    objectCaught: -1
}

function wilderness_load()
{
    const gameWindow = document.getElementById('gameWindow');
    windowSettings(undefined, 370, FILES.wildMap, [-600,-200], 'relative');
    newElement('span', gameWindow, 'positionText', 'positionText');
    for(let i = 0; i < wilderness_mapDetails.objects.length; i++)
    {
        const theObject = wilderness_mapDetails.objects[i]
        theObject.div = newElement('div', gameWindow);
        theObject.div.style.backgroundImage = 'url(img/' + theObject.img + '.webp)';
        wilderness_showObject(theObject);
    }
    
    gameWindow.onmousedown = function(e){wilderness_mapGrab(e)};
    gameWindow.onclick = function(e){wilderness_mapClick()};
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
    theObject.div.style.position = 'absolute';
    theObject.div.style.left = objectPositionX + 'px';
    theObject.div.style.top = objectPositionY + 'px';
    theObject.div.style.cursor = 'pointer';
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

function wilderness_mapClick()
{
    const OBJECT = wilderness_mapDetails.objectCaught;
    if(OBJECT >= 0 && wilderness_mapDetails.mapMoved == false)
    {
        const FUNCTION = wilderness_mapDetails.objects[OBJECT].function;
        const ARGUMENTS = wilderness_mapDetails.objects[OBJECT].functionArguments;
        FUNCTION(ARGUMENTS);
    }
}

function wilderness_mouseOnMapMove(e)
{
    const gameWindow = document.getElementById('gameWindow');
    wilderness_mapDetails.mouseMove = true;

    if(wilderness_mapDetails.mousedown == false)
    {
        const X = e.x - gameWindow.style.backgroundPositionX.slice(0,-2) - gameWindow.offsetParent.offsetLeft;
        const Y = e.y - gameWindow.style.backgroundPositionY.slice(0,-2) - gameWindow.offsetParent.offsetTop;
        const cursorPos = [X, Y];
        document.getElementById('positionText').innerHTML = Math.floor(cursorPos[0] / 10)  + '/' + Math.floor(cursorPos[1] / 10);
        const currentObject = wilderness_mapDetails.activeObject;
        let objectCaught = -1;
        for(let i = 0; i < wilderness_mapDetails.objects.length; i++)
        {
            if(cursorPos[0] >= wilderness_mapDetails.objects[i].position[0] &&
                cursorPos[1] >= wilderness_mapDetails.objects[i].position[1] &&
                cursorPos[0] <= wilderness_mapDetails.objects[i].position[2] && 
                cursorPos[1] <= wilderness_mapDetails.objects[i].position[3])
                    objectCaught = i;
        }
        if(objectCaught != currentObject)
        {
            if(currentObject >= 0)
                wilderness_mapDetails.objects[currentObject].div.style.backgroundImage = 'url(img/' + wilderness_mapDetails.objects[currentObject].img + '.webp)';
            if(objectCaught >= 0)
                wilderness_mapDetails.objects[objectCaught].div.style.backgroundImage = 'url(img/' + wilderness_mapDetails.objects[objectCaught].img + '_active.webp)';
            wilderness_mapDetails.activeObject = objectCaught;
        }
        wilderness_mapDetails.objectCaught = objectCaught;
    }
}

function wilderness_mapMove(e)
{
    if(wilderness_mapDetails.mouseMove == false && wilderness_mapDetails.activeObject >= 0)
    {
        const currentObject = wilderness_mapDetails.activeObject;
        wilderness_mapDetails.objects[currentObject].div.style.backgroundImage = 'url(img/' + wilderness_mapDetails.objects[currentObject].img + '.webp)';
        wilderness_mapDetails.activeObject = -1;
    }

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