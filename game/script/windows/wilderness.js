class mapObject
{
    constructor(img, positionX, positionY, sizeX, sizeY, theFunction, argument, travel)
    {
        this.img = img;
        this.position = [positionX, positionY];
        this.size = [sizeX, sizeY];
        this.functionArguments = argument;
        this.travel = travel;
        switch(theFunction * 1)
        {
            case 0: this.function = showWindow; break;
            case 1: this.function = wilderness_travel; break;
        }
        this.div = null;
    }
}

const wilderness_mapDetails = 
{
    position: [0,0],
    mousePos: [0,0],
    mousedown: false,
    mapMoved: false,
    mouseMove: false,
    mapSize: [1280,789],
    windowSize: [0,0],
    objects: [],
}

function wilderness_load(res)
{
    const gameWindow = document.getElementById('gameWindow');
    wilderness_mapDetails.mapSize[0] = res['size'][0]['value'];
    wilderness_mapDetails.mapSize[1] = res['size'][1]['value'];
    const mapStartPos = [res['size'][2]['value'], res['size'][3]['value']];

    windowSettings(undefined, 370, FILES.wildMap, [mapStartPos[0], mapStartPos[1]], 'relative');
    newElement('span', gameWindow, 'positionText', 'positionText');
    
    wilderness_mapDetails.objects.length = 0;
    for(let i = 0; i < res['objects'].length; i++)
    {
        const obj = res['objects'][i];
        const newObject = new mapObject(obj['img'], obj['position_x'], obj['position_y'], obj['size_x'], obj['size_y'], obj['function'], obj['argument'], obj['travel']);
        wilderness_mapDetails.objects.push(newObject);

        const theObject = wilderness_mapDetails.objects[i]
        theObject.div = newElement('div', gameWindow, 'wildObject');
        theObject.div.style.backgroundImage = 'url(img/' + theObject.img + '.webp)';
        theObject.div.onmouseover = function(){theObject.div.style.backgroundImage = 'url(img/' + theObject.img + '_active.webp)'}
        theObject.div.onmouseout = function(){theObject.div.style.backgroundImage = 'url(img/' + theObject.img + '.webp)'}
        theObject.div.onclick = function(){wilderness_mapClick(theObject)}
        wilderness_showObject(theObject);
    }
    
    gameWindow.onmousedown = function(e){wilderness_mapGrab(e)};
    gameWindow.onmousemove = function(e){wilderness_mouseOnMapMove(e)};
}

function wilderness_showObject(theObject)
{
    const gameWindow = document.getElementById('gameWindow');
    const mapBorderLeft = -1 * gameWindow.style.backgroundPositionX.slice(0,-2);
    const mapBorderRight = mapBorderLeft + gameWindow.offsetWidth;
    const mapBorderTop = -1 * gameWindow.style.backgroundPositionY.slice(0,-2);
    const mapBorderBottom = mapBorderTop + gameWindow.offsetHeight;
    
    let objectBGPosX = 0;
    let objectBGPosY = 0;
    let objectPositionX = theObject.position[0] - mapBorderLeft;
    let objectPositionY = theObject.position[1] - mapBorderTop;
    
    let objectSizeX = theObject.size[0];
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
    
    let objectSizeY = theObject.size[1];
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

function wilderness_travel(which)
{
    sendRequest(DBC_NAMES.wildernessTravelData, document.getElementById('gameWindow'), null, which);
}

function wilderenss_showTravel(which, res)
{
    showWindow();
    const gameWindow = document.getElementById('gameWindow');
    windowSettings(512, 1050);
    const img = newElement('div', gameWindow, 'image travelImage');
    img.style.backgroundImage = 'url(img/' + which + '_image.webp)';
    const container = newElement('div', gameWindow, 'flexbox');
    const form = newElement('div', container, 'travelForm');
    const travelTime = newElement('p', form);

    let s = 's';
    let y = 'y';
    travelTime.innerText = res['remaining'][0]['text'] + ': 3 ' + res['remaining'][1]['text'].replace('[s]', s).replace('[y]', y);
    temporary.time = 3;
    const select = newElement('div', form);
    const watch = newElement('div', container, 'sunwatch');
    const time = newElement('div', watch);
    
    watch.onmousemove = function(e){wilderness_chooseTime(e, this, time)}
    watch.onclick = function(){wilderness_setTime(travelTime, res)}
}

function wilderness_setTime(text, res)
{
    temporary.time = temporary.timechoosing;
    const half = Math.floor(temporary.time) != temporary.time;
    const s = temporary.time == 1 ? '' : 's';
    const y = half || ((temporary.time < 10 || temporary.time > 20) && temporary.time % 10 > 1 && temporary.time % 10 < 5)? 'y' : temporary.time == 1 ? 'a' : '';

    text.innerText = res['remaining'][0]['text'] + ': ' + temporary.time + ' ' + res['remaining'][1]['text'].replace('[s]', s).replace('[y]', y);;
}

function wilderness_chooseTime(e, watch, text)
{
    const x = e.pageX - e.currentTarget.offsetLeft - e.currentTarget.clientLeft - e.currentTarget.offsetParent.offsetLeft - e.currentTarget.offsetParent.clientLeft;
    const y = e.pageY - e.currentTarget.offsetTop - e.currentTarget.clientTop - e.currentTarget.offsetParent.offsetTop - e.currentTarget.offsetParent.clientTop;
    const X = x - 145;
    const Y = 170 - y;
    
    const angles = [-0.125, -0.256, -0.4, -0.57, -0.77, -1, -1.3, -1.75, -2.5, -3.9, -8, Infinity, 8, 3.9, 2.5, 1.75, 1.3, 1, 0.77, 0.57, 0.4, 0.256, 0.125, 0];
    let time = 0;
    if(Y > 0)
    {
        const a = X == 0 ? Infinity : Y/X;
        for(let i = 1; i < angles.length; i++)
        {
            if(angles[i - 1] < 0)
            {
                if(angles[i] < 0 && a <= angles[i - 1] && a > angles[i])
                    time = i;
                if(angles[i] > 0 && a <= angles[i - 1])
                    time = i;
            }
            else if(a <= angles[i - 1] && a > angles[i])
                time = i;
        }
    }
    else
        time = X <= 0 ? 0 : angles.length;
    
    const width = watch.clientWidth;
    const height = watch.clientHeight;
    if(time <= 12)
    {
        watch.style.backgroundPositionX = (-1 * width * time) + 'px';
        watch.style.backgroundPositionY = '0px';
    }
    else
    {
        watch.style.backgroundPositionX = (-1 * width * (time - 13)) + 'px';
        watch.style.backgroundPositionY = (-1 * height) + 'px';
    }

    temporary.timechoosing = time / 2 + 0.5;

    text.innerText = temporary.timechoosing;
}