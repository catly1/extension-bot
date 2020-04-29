
document.addEventListener('DOMContentLoaded', () => {

    let btnRecord = document.getElementById('record-button');
    let btnStart = document.getElementById('start-button');
    let btnStop = document.getElementById('stop-button');
    let lblStatus = document.getElementById('status-label');

    btnRecord.onclick = (element) => {
        lblStatus.innerHTML = "Record";
        chrome.storage.local.set({ "status": "record" }, () => {
            console.log("added in local api")
        });
        chrome.runtime.sendMessage({ action: "start" });
    }

    btnStart.onclick = (element) => {
        lblStatus.innerHTML = "Started";
        chrome.storage.local.set({ "status": "play" }, () =>{
            console.log("added in local api")
        });
        chrome.runtime.sendMessage({ action: "start" });
    }

    btnStop.onclick = (element) => {
        lblStatus.innerHTML = "Stopped";
        chrome.storage.local.set({ "status": "stop" }, () => {
            console.log("added in local api")
        });
        chrome.runtime.sendMessage({ action: "stop" });
    }

    // const bg = chrome.extension.getBackgroundPage()
    // Object.keys(bg.test).forEach((url) => {
    //     const div = document.createElement('div')
    //     div.textContent = `${url}: ${bg.test[url]}`
    //     document.body.appendChild(div)
    // })

}, false)