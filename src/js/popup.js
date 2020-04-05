
document.addEventListener('DOMContentLoaded', function () {

    const bg = chrome.extension.getBackgroundPage()
    Object.keys(bg.test).forEach(function (url) {
        const div = document.createElement('div')
        div.textContent = `${url}: ${bg.test[url]}`
        document.body.appendChild(div)
    })

}, false)