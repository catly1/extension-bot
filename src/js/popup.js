let btnStart = document.getElementById('start-button');
let btnStop = document.getElementById('stop-button');
let lblStatus = document.getElementById('status-label');

let port = null;
const sendPortMessage = message => port.postMessage(message);
const messageHandler = message => {
    console.log('popup.js - received message:', message);
};

const getTab = () =>
    new Promise(resolve => {
        chrome.tabs.query(
            {
                active: true,
                currentWindow: true
            },
            tabs => resolve(tabs[0])
        );
    });

btnStart.onclick = (element) => {
    lblStatus.innerHTML = "Started";


    // Handle port messages
    

    getTab().then(tab => {
        // Connects to tab port to enable communication with inContent.js
        port = chrome.tabs.connect(tab.id, { name: 'chrome-extension-template' });
        // Set up the message listener
        port.onMessage.addListener(messageHandler);
        // Send a test message to in-content.js
        sendPortMessage('after pressing start');
        chrome.runtime.sendMessage({ action: "start" }, (response) => { });
    });
    
}

btnStop.onclick = (element) => {
    lblStatus.innerHTML = "Stopped";
    console.log("stopped")
    chrome.runtime.sendMessage({ action: "stop" }, (response) => { });
}


document.addEventListener('DOMContentLoaded', initPopupScript);