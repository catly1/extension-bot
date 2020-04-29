const re = new RegExp('skill', 'gi');
const matches = document.documentElement.innerHTML.match(re) || [];
// const firstLink = document.getElementById("rso").firstElementChild;
// const queue = [firstLink];
const clicks = [];
// document.onmousedown = e => {
//     clicks.push([e.clientX, e.clientY, e.timeStamp]);
// }
// const bg = chrome.extension.getBackgroundPage();
let status;
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

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    

    if (request.action == "start") {
        running = true;
        startAutomation(request, sendResponse);
    }
    else if (request.action == "stop") {
        stopAutomation();
    }

})


// const questMode = () => new Promise (resolve =>{
//     console.log(i + 1);
//     resolve();
// })

function mainInterval() {
    // console.log(status)

    setTimeout(() => {

        switch (status) {
            case status = "record":
                document.onmousedown = e => {
                    clicks.push([e.clientX, e.clientY, e.timeStamp]);
                    console.log(clicks);
                }
                break;
            case status = "play":
                if (clicks.length > 0) {
                    let action = clicks.pop();
                    tap(action);
                }
            case status = "stop":
                break;
            default:
        }

        // console.log(i);
        mainInterval();
    }, 1000)
}

function getStatus(){
    chrome.storage.local.get("status", data => {
        console.log(data.status)
        status = data.status;
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

function tap([x, y, timeStamp]) {
    let element = document.elementFromPoint(x,y)

    if (element){
        let evt1 = document.createEvent('MouseEvents');
        evt1.initMouseEvent('mousedown', true, false);
        let evt2 = document.createEvent('MouseEvents');
        evt2.initMouseEvent('mouseup', true, false);

        element.dispatchEvent(evt1);
        setTimeout(() => {
            element.dispatchEvent(evt2);
        }, Math.round(Math.random() * 42) + 38)
    }

    sleep(timeStamp);
}