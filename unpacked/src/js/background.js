/**
 * Created by lseverino on 10/12/14.
 */
chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.executeScript( tab.id, {
        file: "src/min/js/out.min.js"
    }, function () {
    });
});

chrome.browserAction.setBadgeText({text: '(7)'});
