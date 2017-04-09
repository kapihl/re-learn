// Load DOM into JS-context. Simple, non-async

// util
function Util(){
  this.myLog = function(msg){
    var debug = false;
    if (debug){
      console.log(msg);
    }
  }
}

// 'class' Run: prepare, setup and run
function Run(){
  global = { "history": {}, "insert": null, "page": null, "util": null};
  var init = initialize();
  global.insert = init.insert;
  global.page   = init.page;
 
  function initialize(){
    console.log("util " + util + " string " + util.toString());
    var gui = new Gui();
    console.log("gui " + gui + " string " + gui.toString());
    util.myLog("init START");
  
   var button = document.getElementsByTagName("BUTTON");
    for (i=0; i < button.length; i++){
      gui.command(button[i])
	  }
    // hide GUI for showing visited links
    document.getElementById("showLinksVisited").style.visibility = "hidden";
    var iframe = document.createElement('iframe');
    iframe.width  = 1200;
    iframe.height = 800;
    iframe.sandbox ="";
    iframe.style.visibility = "hidden";
    // insert at div tag
    var myDiv = document.getElementById("loadLocalFrame");
    myDiv.style.visibility = "hidden";
    myDiv.appendChild(iframe);
    var tuple = {"insert": myDiv, "page": iframe};
    return tuple;
  }
}// end prepare


// 'class' Gui: most of payload functionality.
function Gui(){
  this.command = function (cmd){
    var status = document.getElementById("statusMsg");
    cmd.onclick = function(){
      console.log("Command pressed: " + cmd.id);
      switch (cmd.id){
        case "showCmd" :
          doShow();
          status.value = "Showing links visited";
          break;
        case "pauseCmd":
          status.value = "Not implemented yet";
          break;
        case "clearCmd":
          doClear();
          status.value = "Clear link history";
          break;
        case "startCmd":
          doStart();
          status.value = "Recording started";
          break;
        default:
          status.value = "Wrong command: " + cmd.id + ". No such command exists";
      }
    }
  };
 
  function doShow(){
  // show content of global.history
    var showLinks = document.getElementById("showLinksVisited");
    showLinks.style.visibility = "visible";
    var out = "";
    for (var key in global.history){
      var tmp = "Visited " + key + " at " + global.history[key] + "\n";
      out = out.concat(tmp);
    }
    showLinks.value = out;
  };

  function doClear(){
    global.history = {};
    document.getElementById("showLinksVisited").value = "No links visited";
  };

  function doStart(){
    // doStart: alter all links, a) track, b) show in iframe
    //   1st loop: linkStore populated with old and parent
    //   2nd loop: remove old, and add new links to/from DOM
    var linkStore = [];
    util.myLog("doStart START");
    var link = document.getElementsByTagName("A");
    for (var i=0; i < link.length; i++){
      var curLink = link[i];
      util.myLog("LOOP:" + curLink);
      // add tuple to store
      var linkInfo = {};
      linkInfo['old']     = curLink;
      linkInfo['anc']     = curLink.parentElement;
      linkStore.push(linkInfo);
    }
    util.myLog("Create links, add to DOM");

    // Adjust: remove old links, insert new
    for (var i=0; i < linkStore.length; i++){
      var info = linkStore[i];
      var parent = info.anc;
      var curLink = info.old;
      // make new link
      var url = curLink.href;
      var txt = curLink.text;    
      var trackBut = mkTrackLink(url, txt);
      util.myLog("track but build, text:" + trackBut.value + "  fn: " + trackBut.onclick);
       // remove old, add new
       util.myLog("ALTER DOM. \n Old: " + info.old + " New: " + trackBut);
       parent.removeChild(curLink);
       parent.appendChild(trackBut);
    }
    util.myLog("doStart END");
  };

  function mkTrackLink(ref, txt){
  // trackLink: DOM item -> DOM item
    util.myLog("trackLink");
    var code = "trackThis(\'".concat(txt);
    code = code.concat("','");
    code = code.concat(ref);
    code = code.concat("\');}");
    util.myLog("STRING: " + code);
    util.myLog("trackThis, code : " + code);

    var butLink = document.createElement("BUTTON");
    butLink.value = txt;
    butLink.type  = "button";
    butLink.innerHTML = txt;
    butLink.onclick = function(){
      util.myLog("Inside generated button onclick");
      trackThis(txt, ref);
    }
    return butLink;
  }
  // trackThis: add to history
  function trackThis(txt, ref){
    util.myLog("trackThis :" + ref);
    global.history[txt] = ref;
    showLocal(ref);
  }

  // showLocal: show in iframe
  function showLocal(href){
    console.log("showLocal: " + href);
    //makeCorsRequest(href)
    load(href);
  }
  function load(url){
    global.insert.style.visibility = "visible";
    global.page.src = url;
    global.page.style.visibility = "visible";
  } 
}// end of Gui-object


// execute
var util = new Util();
var run  = new Run();
