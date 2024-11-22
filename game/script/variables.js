//HTTP Request
let php_request = new XMLHttpRequest();
let requestInterval = null;
let numberOfTries = 0;
const URL_CONNECTION = 'php/connect.php';

//languages
const POLISH = 0;
const ENGLISH = 1;

//game
let currentWindow = '';
let tutorial = 0;
let temporary = {};
let userInfo = {}