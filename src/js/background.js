window.test = {}
let running = false;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    window.test[request.url] = request.firstLink;

    if (request.action == "start") {
        running = true;
        startAutomation(request);
    }
    else if (request.action == "stop") {
        stopAutomation();
    }
})

chrome.browserAction.onClicked.addListener((tab) => {
    chrome.tabs.create({ url: 'popup.html' })
})

const startAutomation = (request)=>{
    if (request.firstLink) document.elementFromPoint(request.firstLink.x, request.firstLink.y);
    if (window.test.start) {
        window.test.start += 1;
    } else {
        window.test.start = 1;
    }
}

const stopAutomation = () => {
 
}
