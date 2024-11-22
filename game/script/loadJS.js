const JS_FILES = 
[
    "script/dictionary.js",
    "script/variables.js",
    "script/connection.js",
    "script/windows.js",
    "script/windows/wilderness.js",
    "script/windows/firstAdoption.js",
    "script/windows/castle.js",
    "script/windows/treasury.js",
    "script/windows/settings.js",

    "script/main.js",
]

function loadJS()
{
    for(let i = 0; i < JS_FILES.length; i++)
    {
        const script = document.createElement('script');
        script.src = JS_FILES[i];
        script.async = false;
        document.head.appendChild(script);
    }
}