// track.js: simple recording of clics on a webpage. HTML file: downloaded file from TMC

// ensure that links do not repeat
function ignore_same_links(){
  // iterate trough dom-list, make dictionary of href = full dom item
  // before inserting, do lookup. Insert only if not found

  for (var i = 0; i < item.length; i++){
    var my_href = item[i].href
    var key = "".concat(my_href)
    console.log("HREF:  " + my_href)
    // dict allways empty at start, so never filled!!
    if (typeof dict[key] === 'undefined'){
        dict[key] = item[i];
        //console.log("key " + key + " val :" +  dict[key])
    }
  }
}

// add buttons to links held in dict.
function add_buttons(){
  var i = 0
  for (var key in dict){
    i++
    console.log("Before alterations")
    console.log(dict[key])
  //  console.log(testf(dict[key]))
    var current = dict[key]
    var parent = current.parentElement
    // add a button
    var but_id = "insert_button_id" + i
    var new_but = document.createElement("BUTTON")
    new_but.id = but_id
    var but_text = document.createTextNode("TRACK" + i)
    new_but.appendChild(but_text)
    // add 2 LI
    var li1 = document.createElement("LI")
    var li2 = document.createElement("LI")
    // wrap in UL
    var ul = document.createElement("UL")
    li1.appendChild(current)
    li2.appendChild(new_but)
    ul.appendChild(li1)
    ul.appendChild(li2)
    var ul_id = "insert_ul_id"+ i
    ul.id = ul_id
    // FIX: both button and link should each be LI child in new UL. UL -> DOM insert

    // insert back into html
    
    console.log("parent is: "  + parent)
    console.log("wrapper is: " + ul)
    console.log("current is: " + current)
    parent.appendChild(ul)

    // fetch recent created elements and log
    var load_button = document.getElementById(but_id)
    console.log("After id and button added")
    console.log(load_button)

    var load_wrapper = document.getElementById(ul_id)
    console.log(load_wrapper)
    }
}

// initially: read all links
var item = document.getElementsByTagName("a")
var dict = {}

line_sz = 120
mark = Array(line_sz).join("#") + "\n"

console.log(mark)
console.log("Document has " + item.length + " items")

// remove duplicates and add buttons
ignore_same_links()
add_buttons()

console.log("len of dict " + Object.keys(dict).length)
console.log("Printing elements done!")
console.log(mark)


