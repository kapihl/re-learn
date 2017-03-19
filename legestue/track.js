// track.js: simple recording of clics on a webpage. HTML file: downloaded file from TMC

var item = document.getElementsByTagName("a")

size = 160
mark = Array(size).join("#") + "\n"

console.log(mark)
console.log("Document has " + item.length + " items")
console.log("First 20 are: ")

for (var i = 0; i < 20; i++){
  console.log(item[i])
}

console.log("Printing elements done!")
console.log(mark)

