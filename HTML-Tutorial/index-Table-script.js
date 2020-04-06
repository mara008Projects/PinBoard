/* index-Table-script */

/* funktionen Drag&Drop */
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}

/* funktionen PopUp */
function input(){
	if (document.getElementById("pContainer").style.display == "block"){
		document.getElementById("pContainer").style.display = "none";
	} else {
		document.getElementById("pContainer").style.display = "block";
	}
}
