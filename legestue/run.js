// 'class' Run: prepare, setup and run
function Run(){

  var global = {
    "base" : null,        // base document
    "history": {},        // track visited pages
    "insert": null,       // DOM elem
    "page": null,         // iframe for external page
    "isNewPage" : false   // reload frame
  };

  var init = initialize();
  global.insert = init.insert;
  global.page   = init.page;
  global.base = window.location.href;
  util.myLog("Base doc is: " + global.base);

 
  function initialize(){
    console.log("util " + util + " string " + util.toString());
    var gui = new Gui(global);
    console.log("gui " + gui + " string " + gui.toString());
    util.myLog("init START");
  
    var button = document.getElementsByTagName("BUTTON");
    for (var i=0; i < button.length; i++){
      gui.command(button[i])
	  }
    // hide GUI for showing visited links
    document.getElementById("showLinksVisited").style.visibility = "hidden";
    var iframe = document.createElement('iframe');
    iframe.width  = 1200;
    iframe.height = 800;
    iframe.sandbox ="allow-scripts allow-popups allow-forms allow-same-origin";
    iframe.style.visibility = "hidden";

    // insert at div tag
    var myDiv = document.getElementById("loadLocalFrame");
    myDiv.style.visibility = "hidden";
    myDiv.appendChild(iframe);
    var tuple = {"insert": myDiv, "page": iframe};
    return tuple;
  }
}// end Run


// execute
var util = new Util();
var run  = new Run();
