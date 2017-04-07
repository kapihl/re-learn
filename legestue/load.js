// Load DOM into JS-context. Simple, non-async

// GLOBAL VARS
var history = {}
var DEBUG = false

// UTIL
function myLog(msg){
  if (DEBUG){
    console.log(msg);
  }
}

// FUNDEFS
function initialize(){
  myLog("init START")
  button = document.getElementsByTagName("BUTTON")
  for (i=0; i < button.length; i++){
    command(button[i]);
	}
}

function load(url){
  var iframe = document.createElement('iframe');
  iframe.src = url;
  iframe.width  = 1200;
  iframe.height = 800;
  document.div.appendChild(iframe);
} 

// CONTROL
// command: cmd switch
function command(cmd){
  cmd.onclick = function(){
    console.log("Command pressed: " + cmd.id);
    switch (cmd.id){
      case "startCmd": doStart(); 
        break;
      case "showCmd" : doShow();       
        break;
      case "stopCmd" : alert("N/A");
        break;
      default: alert("No such command");
    }
  }
}

// doStart: alter all links, a) track, b) show in iframe
//   1st loop: linkStore populated with old, new and parent
//   2nd loop: remove old, and add new links to/from DOM
function doStart(){
  var linkStore = [] 
  myLog("doStart START");
  var link = document.getElementsByTagName("A");
  for (var i=0; i < link.length; i++){
    var curLink = link[i]
    myLog("LOOP:" + curLink);
    // add triple to store
    var linkInfo = {}
    linkInfo['old']     = curLink;
    linkInfo['anc']     = curLink.parentElement;
    linkStore.push(linkInfo)
  }
  myLog("Create links, add to DOM")

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
     myLog("ALTER DOM. \n Old: " + info.old + " New: " + trackBut)
     parent.removeChild(curLink)
     parent.appendChild(trackBut) 
  }
  myLog("doStart END");
}

// trackLink: DOM item -> DOM item
function mk_trackLink(ref, txt){
  myLog("trackLink");
  //var fn = document.createElement("SCRIPT");
  var code = "trackThis(\'".concat(txt)
  code = code.concat("','");
  code = code.concat(ref); 
  code = code.concat("\');}");
  myLog("STRING: " + code);
// + "showLocal('" + ref + "');}";
  //var code = "showLocal(" + ref + ");";
  //var code = "alert(\"hello\")";
  myLog("trackThis, code : " + code);
  //fn.text  = code;
  var butLink = document.createElement("BUTTON");
  butLink.value = txt;
  butLink.type  = "button";
  butLink.innerHTML = txt;
  // var evCode = eval(code);
  // butLink.onclick = evCode;
  // butLink.setAttribute('onclick','function(){alert(\'hello\');}')
  butLink.onclick = function(){
    myLog("Inside generated button onclick");
    trackThis(txt, ref);
  }
  return butLink;
}

// later: show in html
function doShow(text){
  var out = "";
  var spc = Array(100).join("#") + "\n";
  for (var key in history){
    var tmp = "Visited " + key + " at " + history[key] + "\n"
    out = out.concat(tmp)
  }
  console.log(spc + "Showing history\n" + out + "\n" + spc);
}

function doStop(){
  alert('NOP');
}

// FUNS CALLED WHEN RECORDING ON

// trackThis: add to history
function trackThis(txt, ref){
  myLog("trackThis :" + ref);
  history[txt] = ref;
}

// showLocal: show in iframe
function showLocal(href){
  console.log("showLocal: " + href);
  load(href);
}

// MAIN

initialize()
