var childPageUrl = chrome.extension.getURL('html/timeline-display.html');
function createTimeline() {
  var container=document.createElement("iframe");
  container.id="timeline-container";
  container.name="childFrame";
  container.src= childPageUrl;
  container.style= "position: fixed; bottom: 0; left: 0; z-index: 150; height: 300px; width: 100%; padding: 15px; font-size: 16px;color: #535886;background: rgba(220,229,239,0.9);"
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

  var timeline=document.createElement("div");
  timeline.id="timeline-widget";
  timeline.style="height: 230px; border: 1px solid #aff"
  container.appendChild(timeline);
  //onLoad();
  /*
  window.onload=function(){
      onLoad();
  }
  */
}

function getData() {

  return "abc";
}
chrome.extension.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.action === "start") {
          console.log("output:");
            var ctrl = $("#sb_form_q");
            if (ctrl.length > 0) {
              console.log(ctrl.val());
              if (sendResponse) sendResponse(ctrl.val());
              //data = getData(ctrl.val()) ;  // TODO:

              createTimeline();
            } else {
                alert("No data");
            }

        } else if (request.action === "paste") {
            var removeObj= document.getElementById("timeline-container");
            removeObj.parentNode.removeChild(removeObj);
        }

    }
);
