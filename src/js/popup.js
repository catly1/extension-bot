let btnStart = document.getElementById('start-button');
let btnStop = document.getElementById('stop-button');
let lblStatus = document.getElementById('status-label');

btnStart.onclick = function (element) {
    lblStatus.innerHTML = "Started";
}

btnStop.onclick = function (element) {
    lblStatus.innerHTML = "Stopped";
}