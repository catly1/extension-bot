const re = new RegExp('skill', 'gi');
const matches = document.documentElement.innerHTML.match(re) || [];
const firstLink = document.getElementById("rso").firstElementChild.getBoundingClientRect();
// const bg = chrome.extension.getBackgroundPage();
let on;
// chrome.runtime.sendMessage({
//     url: window.location.href,
//     count: matches.length,
//     firstLink: firstLink
// }, response => {
//     console.log("Response: ", response)
// })


setInterval(()=>{
    chrome.storage.local.get("on", data => {
        on = data.on;
    })

    if (on) {
        console.log("It's on")
        // document.elementFromPoint(firstLink.x, firstLink.y).click();
    }

    
},1000)

