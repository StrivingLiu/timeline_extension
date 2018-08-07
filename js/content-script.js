var childPageUrl = chrome.extension.getURL('html/timeline-display.html');


function createTimelineContainer( size) {
  var container=document.createElement("iframe");
  container.id="timeline-container";
  container.name="childFrame";
  container.src= childPageUrl;
  container.style= "position: fixed; bottom: 0; left: 0; z-index: 100; width: 100%; padding: 15px; font-size: 16px;color: #535886;background: rgba(135,206,239,0.7);";
  // todo: according to the size of hosts, Set an appropriate height of container.
  if(size){
      container.style.height="500px";
  }
  else{
      container.style.height="500px";
  }
    //container.style.setAttribute("border","#e6e7e8 1px solid");
    //container.setAttribute("position","fixed");
    //container.style.buttom = divbuttom+"px";
    //container.style.left = divleft+"px";
    //container.setAttribute("z-index","150");
    //container.setAttribute("height","256px");
    //container.setAttribute("width","100%");
    //container.setAttribute("color","#535886");
    //container.setAttribute("padding","15px");
    //container.style.backgroundColor= "rgba(220,229,239,0.9)";
  document.body.appendChild(container);
}

var patternHost = /.*(\d{4}-\d{2}-\d{2}T\d{2}\:\d{2}:\d{2}).*vim.HostSystem:host-(\d{1,})\,(\d+\.\d+\.\d+\.\d+).*\s(\w+)/;

function getData( inputStr) {
    if(!inputStr) return null;
    var dataJSON = {};
    var dataArr = [];
    var strArr=inputStr.split('\n');

    dataJSON['dateTimeFormat']='iso8601';
    for(num in strArr){
        var result = strArr[num].match(patternHost);
        if(result) {
            var tmpJSON = {};
            tmpJSON['start']=result[1];
            tmpJSON['title']="host"+result[2];
            tmpJSON['description']="IP:"+result[3]+ " state :" + result[4];
            dataArr.push(tmpJSON);
        }

    }
    if(!dataArr){
        return null;
    }
    dataJSON['events']=dataArr;
    return JSON.stringify(dataJSON);
}


chrome.extension.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.action === "start") {
          console.log(request.data);
            var nodeStr="#"+request.data;
            var ctrl = $(nodeStr);
            if (ctrl.length > 0) {
                //*
                var showData = getData(ctrl.val());
                if(showData){
                    if (sendResponse) sendResponse(showData);
                    createTimelineContainer();
                }
                else{
                    alert("There is no expected data to analyse");
                }

            } else {
                alert("The specified id was not found on this page");
            }

        } else if (request.action === "paste") {
            var removeObj= document.getElementById("timeline-container");
            if(removeObj) {
                removeObj.parentNode.removeChild(removeObj);
            }
        }

    }
);
