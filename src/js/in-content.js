const re = new RegExp('skill', 'gi');
const matches = document.documentElement.innerHTML.match(re) || [];
// const firstLink = document.getElementById("rso").firstElementChild;
// const queue = [firstLink];
const clicks = [];
document.onmousedown = e => {
    clicks.push([e.clientX, e.clientY, e.timeStamp]);
}
// const bg = chrome.runtime.getBackgroundPage();
let status;
// chrome.runtime.sendMessage({
//     url: window.location.href,
//     count: matches.length,
//     firstLink: firstLink
// }, response => {
//     console.log("Response: ", response)
// })


getStatus();
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(message)
    switch (message.status) {
        case "record":
            chrome.storage.local.set({ "status": "recording" });
            handleRecoding();  
            break;
        case "play":
            chrome.storage.local.set({ "status": "playing", "playing": message.selected}, ()=>{
                console.log(message.selected)
                chrome.runtime.sendMessage(
                    { status: "play" }
                    , response => {
                        console.log(response)
                    })
                handlePlay();
            });
            break;
        case "stop":
            chrome.storage.local.set({ "status": "stopped" });
            handleStop();
            break;
        default:
    }

})

function handlePlay(){
    chrome.storage.local.get("playing", ({playing})=>{
        let newIdx = playing.idx + 1;
        if (newIdx > (playing.steps.length - 1)) {
            chrome.storage.local.set({ "status": "" });
            chrome.storage.local.set({ "playing": "" });
            console.log("finished");
            console.log(playing)
            console.log(newIdx);
            return
        }
        let newRecordingObject = playing;
        newRecordingObject.idx = newIdx;
        console.log(newRecordingObject);
        chrome.storage.local.set({playing: newRecordingObject})
        let step = playing.steps[playing.idx];
        tap(step)
    })
}

function handleStop(){
    document.onmousedown = e => { };
    chrome.runtime.sendMessage(
        { status: "stop" }
        , response => {
            console.log(response)
        })
}

function handleRecoding(){
    console.log(status);
    console.log("got here")
    document.onmousedown = e => {
        chrome.runtime.sendMessage(
            {
                status: "record",
                action: [e.clientX, e.clientY, e.timeStamp]
            }
            , response => {
                console.log(response)
            })
    }  
}

let i = 0


// function mainInterval() {

//     setTimeout(() => {

//         switch (status) {
//             case status = "record":
//                 document.onmousedown = e => {
//                     clicks.push([e.clientX, e.clientY, e.timeStamp]);
//                     console.log(clicks);
//                 }
//                 break;
//             case status = "play":
//                 if (clicks.length > 0) {
//                     let action = clicks.pop();
//                     tap(action);
//                 }
//             case status = "stop":
//                 break;
//             default:
//         }

//         // console.log(i);
//         mainInterval();
//     }, 1000)
// }


function getStatus(){
    chrome.storage.local.get("status", data => {
        status = data.status;
        console.log(status)
        if (status == "recording") handleRecoding();
        if (status == "playing") handlePlay();
    })

    chrome.storage.local.get("recordings", data => {
        console.log(data);
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
    sleep(timeStamp);
    let element = document.elementFromPoint(x,y)
    console.log(x, y, timeStamp)
    console.log(element)
    if (element){
        element.click();
        // let evt1 = document.createEvent('MouseEvents');
        // evt1.initMouseEvent('mousedown', true, false);
        // let evt2 = document.createEvent('MouseEvents');
        // evt2.initMouseEvent('mouseup', true, false);

        // element.dispatchEvent(evt1);
        // setTimeout(() => {
        //     element.dispatchEvent(evt2);
        // }, Math.round(Math.random() * 42) + 38)
    }
}