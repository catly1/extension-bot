
document.addEventListener('DOMContentLoaded', () => {

    let btnStart = document.getElementById('start-button');
    let btnStop = document.getElementById('stop-button');
    let lblStatus = document.getElementById('status-label');

    btnStart.onclick = (element) => {
        lblStatus.innerHTML = "Started";
        chrome.storage.local.set({ "on": true }, () =>{
            console.log("added in local api")
        });
        chrome.runtime.sendMessage({ action: "start" });
    }

    btnStop.onclick = (element) => {
        lblStatus.innerHTML = "Stopped";
        chrome.runtime.sendMessage({ action: "stop" });
    }

    // const bg = chrome.extension.getBackgroundPage()
    // Object.keys(bg.test).forEach((url) => {
    //     const div = document.createElement('div')
    //     div.textContent = `${url}: ${bg.test[url]}`
    //     document.body.appendChild(div)
    // })

}, false)