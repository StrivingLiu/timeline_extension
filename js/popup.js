$(function () {
    $("#startParse").click(function () {
        console.log("bbb");
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "start" }, function (response) {
                var win = chrome.extension.getBackgroundPage();
                win.data=response;
                console.log(response);
            });
        });
    });
    $("#exitButton").click(function () {
        var win = chrome.extension.getBackgroundPage();
        if (win.data) {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { action: "paste", data: win.data }, function (response) {
                    console.log(response);
                });
            });
        }
    });
});




/*

document.getElementById("startParse").addEventListener("click",function(){
  console.log("ssss");
  chrome.tabs.insertCSS(tabs[0].id, {file: 'css/load-timeline.css'});
  chrome.tabs.executeScript(tabs[0].id, {file: 'js/load-timeline.js'});

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "copy" }, function (response) {
            var win = chrome.extension.getBackgroundPage();
            win.data=response;
            console.log(response);
        });
    });
});
document.getElementById("exitButton").addEventListener("click",function(){
  var win = chrome.extension.getBackgroundPage();
  if (win.data) {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          chrome.tabs.sendMessage(tabs[0].id, { action: "paste", data: win.data }, function (response) {
              console.log(response);
          });
      });
  }
});
*/
