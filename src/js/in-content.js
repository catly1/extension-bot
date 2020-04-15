const re = new RegExp('skill', 'gi')
const matches = document.documentElement.innerHTML.match(re) || []
const firstLink = document.getElementById("rso").firstElementChild.getBoundingClientRect();

chrome.runtime.sendMessage({
    url: window.location.href,
    count: matches.length,
    firstLink: firstLink
}, response => {
    console.log("Response: ", response)
})

