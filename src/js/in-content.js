const re = new RegExp('skill', 'gi');
const matches = document.documentElement.innerHTML.match(re) || [];
const firstLink = document.getElementById("rso").firstElementChild.getBoundingClientRect();
// const bg = chrome.extension.getBackgroundPage();
let on = false;
// chrome.runtime.sendMessage({
//     url: window.location.href,
//     count: matches.length,
//     firstLink: firstLink
// }, response => {
//     console.log("Response: ", response)
// })
console.log("content loaded");
console.log(firstLink);
chrome.storage.local.get("on", data => {
    console.log(data)
    on = data.on;
})

if (on){
    document.elementFromPoint(firstLink.x,firstLink.y).click();
}