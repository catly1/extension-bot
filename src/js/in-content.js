const re = new RegExp('skill', 'gi');
const matches = document.documentElement.innerHTML.match(re) || [];
const firstLink = document.getElementById("rso").firstElementChild.getBoundingClientRect;
// const bg = chrome.extension.getBackgroundPage();
let on;
// chrome.runtime.sendMessage({
//     url: window.location.href,
//     count: matches.length,
//     firstLink: firstLink
// }, response => {
//     console.log("Response: ", response)
// })


setInterval(()=>{
    chrome.storage.local.get("on", data => {
        on = data.on;
    })

    if (on) {
        console.log("It's on")
        // sleep(5000);
        tap(firstLink);
    }

    
},1000)

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function tap(element) {
    let evt1 = document.createEvent('MouseEvents');
    evt1.initMouseEvent('mousedown', true, false);
    let evt2 = document.createEvent('MouseEvents');
    evt2.initMouseEvent('mouseup', true, false);

    element.dispatchEvent(evt1);
    setTimeout(() =>{
        element.dispatchEvent(evt2);
    }, Math.round(Math.random() * 42) + 38)
}