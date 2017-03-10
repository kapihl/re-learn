// knapper.js: simple recording of buttons clicked. HTML file: knapper-js.html

// click history
var save = []

// bind html to javascript
for (i=1; i < 10; i++){
    var id = 'b'.concat(i.toString())
	var cur = document.getElementById(id)
    console.log("cur:" + cur)
    record(cur, id);
}

function record(event, msg){
    event.onclick  = function () {
    	console.log("List elements")
    	elem_txt = "Name:" + event.name + ", elem val:" + event.value + ", id:"+ msg
  		console.log(elem_txt)
		save.push(elem_txt)
        console.log("add to history")
    }
}

function print_history(h){
    var line = ""
    console.log("len of save arr is:" + save.length)
	for (i=0; i < save.length; i++){
        console.log('hist' + i)
		//document.write(h[i])
        line = line.concat(save[i])
        console.log("line is :" +line)
	}
	window.alert("content" + line)
}
var show_hist = document.getElementById('100')
show_hist.onclick = function () {print_history(save);}


