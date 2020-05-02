window.test = {}
let running = false;
let recording = [];

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    
    switch (message.status) {
        case "record":
            recording.push(message.action)
            sendResponse(recording)
            console.log(message)
            console.log(sender)
            break;
        case "play":
            sendResponse("Got from backround play")
            console.log(message)
            console.log(sender)
            break;
        case "stop":
            console.log(message)
            sendResponse("Got from backround stop")
            console.log(sender)
            break;
        default:
    }


})

chrome.browserAction.onClicked.addListener((tab) => {
    chrome.tabs.create({ url: 'popup.html' })
})

const startAutomation = (request, sendResponse)=>{
    if (request.firstLink) sendResponse(request.firstLink)
        // document.elementFromPoint(request.firstLink.x, request.firstLink.y).click();
    if (window.test.start) {
        window.test.start += 1;
    } else {
        window.test.start = 1;
    }
}

const stopAutomation = () => {
 
}

function buildRecordingData() {
    let oldRecordings = [];
    let recordingData = {};
    recordingData["date"] = (new Date()).getUTCDate();
    recordingData["idx"] = 0;
    recordingData["steps"] = record();
    chrome.storage.get("recordings", data => {
        console.log(data)
        oldRecordings = data.recordings
    })
    oldRecordings.push(recordingData)
    chrome.storage.local.set({
        "recordings": oldRecordings
    });
}