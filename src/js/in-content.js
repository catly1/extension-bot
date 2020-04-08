const re = new RegExp('skill', 'gi')
const matches = document.documentElement.innerHTML.match(re) || []

chrome.runtime.sendMessage({
    url: window.location.href,
    count: matches.length
})