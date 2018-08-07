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

var timeline_data = {  // save as a global variable
    'dateTimeFormat': 'iso8601',
    'wikiURL': "http://simile.mit.edu/shelf/",
    'wikiSection': "Simile Cubism Timeline",
    'events': [
        {
            'start': 'Jul 25 2018 09:00:00 GMT',
            'end': "Jul 26 2018 09:00:00 GMT",
            'isDuration': true,
            'color': "black",
            'title': "Host 1",
            'description': "test",
            'image': "http://simile.mit.edu/images/csail-logo.gif",
            'link': 'http://www.allposters.com/-sp/Barfusserkirche-1924-Posters_i1116895_.htm'
        },


        {
            'start': 'Jul 26 2018 00:00:00 GMT',
            'end': 'Jul 26 2018 09:00:00 GMT',
            'title': 'Three Figures',
            'description': 'by Kasimir Malevich, Ukrainian Painter, 1878-1935',
            'image': 'http://images.allposters.com/images/BRGPOD/75857_b.jpg',
            'link': 'http://www.allposters.com/-sp/Three-Figures-1913-28-Posters_i1349989_.htm'
        },


        {
            'start': 'Jul 26 2018 06:00:00 GMT',
            'title': 'Landschaft bei Montreuil',
            'description': 'by Albert Gleizes, French Painter, 1881-1953',
            'image': 'http://images.allposters.com/images/mer/1336_b.jpg',
            'link': 'http://www.allposters.com/-sp/Landschaft-bei-Montreuil-Posters_i339007_.htm',
            'isDuration': true,
            'icon': "dark-red-circle.png",
            'color': 'red',
            'textColor': 'green'
        }
    ]
};

var tl;
function onLoad() {

    // todo: according to the height of timeline-container, set widget.height .
    var timelineWidget=document.getElementById('timeline-widget');
    timelineWidget.style.height="420px";

    var eventSource1 = new Timeline.DefaultEventSource();
    var receiveData= chrome.extension.getBackgroundPage().data;
    console.log(receiveData);
    var dataToJSON = JSON.parse(receiveData);
    var bandInfos = [
      Timeline.createBandInfo({
        eventSource:    eventSource1,
        date:           dataToJSON['events'][0]['start'],
        width:          "70%",
        intervalUnit:   Timeline.DateTime.HOUR,
        intervalPixels: 100
        }),
      Timeline.createBandInfo({
        overview:       true,
        eventSource:    eventSource1,
        width:          "20%",
        intervalUnit:   Timeline.DateTime.DAY,
        intervalPixels: 400
        }),
        Timeline.createBandInfo({
            overview:       true,
            eventSource:    eventSource1,
            width:          "10%",
            intervalUnit:   Timeline.DateTime.MONTH,
            intervalPixels: 1000
        })
    ];


    bandInfos[1].syncWith = 0;
    bandInfos[2].syncWith = 1;
    bandInfos[1].highlight = true;
    tl = Timeline.create(document.getElementById("timeline-widget"), bandInfos);
    var url = '.';
    eventSource1.loadJSON(dataToJSON, url);
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

window.addEventListener("load", onLoad);
/*
window.onload=function(){
    onLoad();
}
*/

//document.write("<script src=\"http://api.simile-widgets.org/timeline/2.3.1/timeline-api.js?bundle=true\" type=\"text/javascript\"></script>");
