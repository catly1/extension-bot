window.test = {}
let running = false;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    switch (message) {
        case status = "record":
            sendResponse("Got from backround record")
            console.log(message)
            console.log(sender)
            break;
        case status = "play":
            sendResponse("Got from backround play")
            console.log(message)
            console.log(sender)
            break;
        case status = "stop":
            console.log(message)
            sendResponse("Got from backround stop")
            console.log(sender)
            break;
        default:
    }

    sendResponse(message)
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