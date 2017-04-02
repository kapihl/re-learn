// Load DOM into JS-context. Simple, non-async

// GLOBAL VARS
var history = {}

// FUNDEFS
function initialize(){
  console.log("init START")
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
  console.log("doStart START");
  var link = document.getElementsByTagName("A");
  for (var i=0; i < link.length; i++){
    var curLink = link[i]
    console.log("LOOP:" + curLink);
    // make new link
    var url = curLink.href;
    var txt = curLink.text;    
    var newL = trackLink(url, txt);
    console.log("newLink created! Text:" + newL.text + " and href: " + newL.onclick + "\n src" + newL.onclick)
    // add triple to store
    var linkInfo = {}
    linkInfo['old']     = curLink;
    linkInfo['created'] = newL;
    linkInfo['anc']     = curLink.parentElement;
    linkStore.push(linkInfo)
  }
  // Adjust: remove old links, insert new
  for (var i=0; i < linkStore.length; i++){
     var info = linkStore[i];
     var parent = info.anc
     // remove old
     console.log("ALTER DOM. \n Old: " + info.old + " New: " + info.created)
     parent.removeChild(info.old)
     parent.appendChild(info.created) 
  }
  console.log("doStart END");
}

// trackLink: DOM item -> DOM item
function trackLink(ref, txt){
  console.log("trackLink");
  var fn = document.createElement("SCRIPT");
  var co   = "trackThis("+ txt + "," + ref +");" + "showLocal(" + ref + ");";
  var code = "showLocal(" + ref + ");";
  //var code = "alert(\"hello\")";
  console.log("trackThis, code : " + code)
  fn.text  = code;
  var butLink = document.createElement("BUTTON");
  butLink.value = txt;
  butLink.type  = "button"
  butLink.innerHTML = txt;
  //butLink.onclick = code;
  return butLink;
}

// later: show in html
function doShow(text){
  var out = "";
  var spc = Array(100).join("#") + "\n";
  for (var key in history){
    var tmp = "Visited " + key + " at " + history[key];
    out += out
  }
  console.log(spc + "Showing history\n" + out + "\n" + spc);
}

function doStop(){
  alert('NOP');
}

// FUNS CALLED WHEN RECORDING ON

// trackThis: add to history
function trackThis(txt, ref){
  cosole.log("trackThis :" + ref);
  history[txt] = ref;
}

// showLocal: show in iframe
function showLocal(href){
  console.log("showLocal: " + href);
  load(href);
}

// MAIN

initialize()
