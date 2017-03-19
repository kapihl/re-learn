// track.js: simple recording of clics on a webpage. HTML file: downloaded file from TMC

var item = document.getElementsByTagName("a")

line_sz = 160
elems   = 10
mark = Array(line_sz).join("#") + "\n"

console.log(mark)
console.log("Document has " + item.length + " items")
console.log("First " + elems + " are: ")

for (var i = 0; i < elems; i++){
  console.log(item[i])
}

console.log("Printing elements done!")
console.log(mark)

