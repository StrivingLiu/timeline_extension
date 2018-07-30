/*
var headobj = document.getElementsByTagName('head')[0];
var sobj = document.createElement('script');
sobj.type = "text/javascript";
sobj.src = "http://api.simile-widgets.org/timeline/2.3.1/timeline-api.js?bundle=true";
sobj.onload= function(){
  createTimeline();
 }
headobj.appendChild(sobj);


var headobj = document.getElementsByTagName('head')[0];
var sobj = document.createElement('script');
sobj.type = "text/javascript";
sobj.src = "file:///Users/liuzhen/Desktop/test_extension/timeline/timeline_ajax/simile-ajax-api.js?bundle=true";
headobj.appendChild(sobj);
console.log("abc");
var sobj2 = document.createElement('script');
sobj2.type = "text/javascript";
sobj2.src = "file:///Users/liuzhen/Desktop/test_extension/timeline/timeline_js/timeline-api.js?bundle=true";
headobj.appendChild(sobj2);
*/

var tl;
function onLoad() {
    var eventSource1 = new Timeline.DefaultEventSource();
    var bandInfos = [
      Timeline.createBandInfo({
        eventSource:    eventSource1,
        date:           "Jul 26 2018 00:00:00 GMT",
        width:          "70%",
        intervalUnit:   Timeline.DateTime.HOUR,
        intervalPixels: 100
        }),
      Timeline.createBandInfo({
        overview:       true,
        eventSource:    eventSource1,
        date:           "Jul 26 2018 00:00:00 GMT",
        width:          "30%",
        intervalUnit:   Timeline.DateTime.DAY,
        intervalPixels: 400
        })
    ];
    var receiveData= chrome.extension.getBackgroundPage().data;

    console.log(receiveData);
    bandInfos[1].syncWith = 0;
    bandInfos[1].highlight = true;
    tl = Timeline.create(document.getElementById("timeline-widget"), bandInfos);
    Timeline.loadXML(receiveData, function(xml, url) { eventSource1.loadXML(xml, url); });
    tl.layout();
}

var resizeTimerID = null;
function onResize() {
    if (resizeTimerID == null) {
        resizeTimerID = window.setTimeout(function() {
            resizeTimerID = null;
            tl.layout();
        }, 500);
    }
}


window.onload=function(){
    onLoad();
}

//document.write("<script src=\"http://api.simile-widgets.org/timeline/2.3.1/timeline-api.js?bundle=true\" type=\"text/javascript\"></script>");
