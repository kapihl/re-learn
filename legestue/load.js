// Load DOM into JS-context. Simple, non-async

// GLOBAL VARS
var global = {};
global.history = {};
global.debug = false;
var init = initialize();
global.insert = init.insert;
global.page   = init.page;


// UTIL START
// --------------------------------------------------------------
function myLog(msg){
  if (global.debug){
    console.log(msg);
  }
}

// FUNDEFS
function initialize(){
  myLog("init START");
  var button = document.getElementsByTagName("BUTTON");
  for (i=0; i < button.length; i++){
    command(button[i]);
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

function load(url){
  global.insert.style.visibility = "visible";
  global.page.src = url;
  global.page.style.visibility = "visible";
} 

// CONTROL
// command: cmd switch
function command(cmd){
  var status = document.getElementById("statusMsg");
  cmd.onclick = function(){
    console.log("Command pressed: " + cmd.id);
    switch (cmd.id){
      case "startCmd":
        doStart();
        status.value = "Recording started";
        break;
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
      default:
        status.value = "Wrong command: " + cmd.id + ". No such command exists";
    }
  }
}

// clear history
function doClear(){
  global.history = {};
  document.getElementById("showLinksVisited").value = "No links visited"
}

// doStart: alter all links, a) track, b) show in iframe
//   1st loop: linkStore populated with old and parent
//   2nd loop: remove old, and add new links to/from DOM
function doStart(){
  var linkStore = [];
  myLog("doStart START");
  var link = document.getElementsByTagName("A");
  for (var i=0; i < link.length; i++){
    var curLink = link[i];
    myLog("LOOP:" + curLink);
    // add tuple to store
    var linkInfo = {};
    linkInfo['old']     = curLink;
    linkInfo['anc']     = curLink.parentElement;
    linkStore.push(linkInfo);
  }
  myLog("Create links, add to DOM");

  // Adjust: remove old links, insert new
  for (var i=0; i < linkStore.length; i++){
    var info = linkStore[i];
    var parent = info.anc;
    var curLink = info.old;
    // make new link
    var url = curLink.href;
    var txt = curLink.text;    
    var trackBut = mk_trackLink(url, txt);
    myLog("track but build, text:" + trackBut.value + "  fn: " + trackBut.onclick);
     // remove old, add new
     myLog("ALTER DOM. \n Old: " + info.old + " New: " + trackBut);
     parent.removeChild(curLink);
     parent.appendChild(trackBut);
  }
  myLog("doStart END");
}

// trackLink: DOM item -> DOM item
function mk_trackLink(ref, txt){
  myLog("trackLink");
  var code = "trackThis(\'".concat(txt);
  code = code.concat("','");
  code = code.concat(ref);
  code = code.concat("\');}");
  myLog("STRING: " + code);
  myLog("trackThis, code : " + code);

  var butLink = document.createElement("BUTTON");
  butLink.value = txt;
  butLink.type  = "button";
  butLink.innerHTML = txt;
  butLink.onclick = function(){
    myLog("Inside generated button onclick");
    trackThis(txt, ref);
  }
  return butLink;
}

// show content of global.history
function doShow(text){
  var showLinks = document.getElementById("showLinksVisited");
  showLinks.style.visibility = "visible";
  var out = "";
  for (var key in global.history){
    var tmp = "Visited " + key + " at " + global.history[key] + "\n";
    out = out.concat(tmp);
  }
  showLinks.value = out;
}

function doStop(){
  alert('NOP');
}

// FUNS CALLED WHEN RECORDING ON

// trackThis: add to history
function trackThis(txt, ref){
  myLog("trackThis :" + ref);
  global.history[txt] = ref;
  showLocal(ref);
}

// showLocal: show in iframe
function showLocal(href){
  console.log("showLocal: " + href);
  //makeCorsRequest(href)
  load(href);
}

