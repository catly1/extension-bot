
document.addEventListener('DOMContentLoaded', function () {

    let btnStart = document.getElementById('start-button');
    let btnStop = document.getElementById('stop-button');
    let lblStatus = document.getElementById('status-label');

    btnStart.onclick = (element) => {
        lblStatus.innerHTML = "Started";
    }

    btnStop.onclick = (element) => {
        lblStatus.innerHTML = "Stopped";
    }

    const bg = chrome.extension.getBackgroundPage()
    Object.keys(bg.test).forEach((url) => {
        const div = document.createElement('div')
        div.textContent = `${url}: ${bg.test[url]}`
        document.body.appendChild(div)
    })

}, false)