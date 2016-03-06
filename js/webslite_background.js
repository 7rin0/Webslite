/**
 * Created by lseverino on 10/12/14.
 */

chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.executeScript( tab.id, {
        file: "webslite_out.js"
    }, function () {
        console.log('fallback');
    });
});

chrome.browserAction.setBadgeText({text: '(7)'});



