window.test = {}
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    window.test[request.url] = request.count;

    if (request.action == "start") {
        startAutomation();
    }
    else if (request.action == "stop") {
        stopAutomation();
    }
})

chrome.browserAction.onClicked.addListener((tab) => {
    chrome.tabs.create({ url: 'popup.html' })
})

const startAutomation = ()=>{
    if (window.test.start) {
        window.test.start += 1;
    } else {
        window.test.start = 1;
    }
}

const stopAutomation = () => {
    console.log("got to stopping automation function")
}
