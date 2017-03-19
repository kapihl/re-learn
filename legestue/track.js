// track.js: simple recording of clics on a webpage. HTML file: downloaded file from TMC

var item = document.getElementsByTagName("a")

line_sz = 160
elems   = 10
mark = Array(line_sz).join("#") + "\n"

console.log(mark)
console.log("Document has " + item.length + " items")
console.log("First " + elems + " are: ")

for (var i = 0; i < elems; i++){
  console.log("Before alterations")
  console.log(item[i])

  // add a button
  var but_id = "insert_button_id" + i
  var new_but = document.createElement("BUTTON")
  new_but.id = but_id
  var but_text = document.createTextNode("TRACK" + i)
  new_but.appendChild(but_text)
  item[i].appendChild(new_but)

  // wrap in <li>, add ID
  var wrapper = document.createElement("LI")
  wrapper.appendChild(item[i])
  var wrap_id = "insert_wrapper_id"+ i
  wrapper.id = wrap_id

  // insert back into html
  var parent = item[i].parentElement
  parent.appendChild(wrapper)

  // fetch recent created elements and log
  var load_button = document.getElementById(but_id)
  console.log("After id and button added")
  console.log(load_button)

  var load_wrapper = document.getElementById(wrap_id)
  console.log(load_wrapper)
  
}

console.log("Printing elements done!")
console.log(mark)

