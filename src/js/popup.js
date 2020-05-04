document.addEventListener('DOMContentLoaded', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        let tabId = tabs[0].id
        getStatus(tabs[0].id)
        let btnRecord = document.getElementById('record-button');
        let btnStart = document.getElementById('start-button');
        let btnStop = document.getElementById('stop-button');
        let lblStatus = document.getElementById('status-label');
        let recordList = document.getElementById('recordings');
        let recordForm = document.getElementById("recordings-form");
        let deleteAll = document.getElementById('delete-all');
        let recordings = [];
        let selectedRecording = {};

        btnRecord.onclick = (element) => {
            lblStatus.innerHTML = "Record";
            chrome.browserAction.setIcon({path: '../red.png', tabId: tabId})
            chrome.tabs.sendMessage(tabs[0].id, {status:"record"});
        }

        // btnStart.onclick = (element) => {
        //     lblStatus.innerHTML = "Started";
            // chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            //     chrome.tabs.sendMessage(tabId, {status: "play", selected: selectedRecording});
            // });
        // }

        recordForm.onsubmit = e => {
            
            let selectedElement = recordForm.querySelector('input[name=recording]:checked');
            let selectedRecording;
            if (selectedElement) {
                selectedRecording = recordings.filter(recording => recording.date == selectedElement.id)[0];
                lblStatus.innerHTML = "playing"
                chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                    chrome.tabs.sendMessage(tabId, { status: "play", selected: selectedRecording });
                });
            } else {
                lblStatus.innerHTML = "nothing selected"
            }

        }

        btnStop.onclick = (element) => {
            lblStatus.innerHTML = "Stopped";
            chrome.browserAction.setIcon({ path: '../48x48.png', tabId: tabId })
            chrome.tabs.sendMessage(tabId, {status:"stop"});
        }

        deleteAll.onclick = (e) => {
            lblStatus.innerHTML = "deleting"
            chrome.storage.local.remove("recordings");

        }
        
        renderRecordings()
        function renderRecordings() {
        chrome.storage.local.get("recordings", data => {
            recordings = data.recordings
            recordings.forEach(recordingData => {
                let li = document.createElement("input");
                li.setAttribute("type", "radio");
                li.setAttribute("name", "recording");
                li.setAttribute("id", recordingData.date);
                li.setAttribute("value", recordingData.date);
                li.onclick = (e) => {
                    selectedRecording = recordingData;
                }
                let text = document.createTextNode(recordingData.date);
                recordList.appendChild(li);
                recordList.appendChild(text);
            })

        })
        }

        // const bg = chrome.extension.getBackgroundPage()
        // Object.keys(bg.test).forEach((url) => {
        //     const div = document.createElement('div')
        //     div.textContent = `${url}: ${bg.test[url]}`
        //     document.body.appendChild(div)
        // })
        function getStatus() {
            chrome.storage.local.get("status", data => {
                if (data.status == "recording") chrome.browserAction.setIcon({ path: '../red.png', tabId: tabId })
            })
        }
    })
}, false)
