window.test = {}
let running = false;
let recordings = [];
let status = false;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    
    switch (message.status) {
        case "record":
            status = "recording";
            recordings.push(message.action)
            sendResponse(recordings)
            break;
        case "play":
            sendResponse("Got from backround play")
            break;
        case "stop":
            status = "stopped"
            sendResponse(buildRecordingData())
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
    recordingData["steps"] = recordings;
    chrome.storage.local.get("recordings", data => {
        console.log(data)
        if (data.recordings){
            oldRecordings = data.recordings
        } else {
            oldRecordings = []
        }
        oldRecordings.push(recordingData)
        chrome.storage.local.set({
            "recordings": oldRecordings
        },()=>{
            recordings = [];
        });
    })
    return recordingData;
}