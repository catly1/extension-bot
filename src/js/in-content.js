const re = new RegExp('skill', 'gi');
const matches = document.documentElement.innerHTML.match(re) || [];
const firstLink = document.getElementById("rso").firstElementChild.getBoundingClientRect;
const queue = [];
// const bg = chrome.extension.getBackgroundPage();
let on;
// chrome.runtime.sendMessage({
//     url: window.location.href,
//     count: matches.length,
//     firstLink: firstLink
// }, response => {
//     console.log("Response: ", response)
// })

// mainInterval()
setInterval(getStatus, 1500)
mainInterval();

let i = 0




// const questMode = () => new Promise (resolve =>{
//     console.log(i + 1);
//     resolve();
// })

function mainInterval() {
    setTimeout(() => {
        
        i += 1

        if (on) {
            console.log("in main, interval: " + i)
            // sleep(5000);
            // tap(firstLink);
        }

        console.log(i);
        mainInterval();
    }, 1500)
}

function getStatus(){
    chrome.storage.local.get("on", data => {
        on = data.on;
    })
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// function action(){
//     i += 1
//     console.log(i)
//     action();
// }
// action();

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