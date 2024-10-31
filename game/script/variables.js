//HTTP Request
let php_request = new XMLHttpRequest();
let requestInterval;
let numberOfTries = 0;

const POLISH = 0;
const ENGLISH = 1;
let currentLanguage = POLISH;
let currentWindow = '';
let mapDetails = 
{
    position: [0,0],
    mousePos: [0,0],
    mousedown: false,
    mapSize: [1280,789],
    windowSize: [0,0]
}
