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
//	alert ("New angeklickt");
	if (document.getElementById("pContainer").style.display == "block"){
		document.getElementById("pContainer").style.display = "none";
	} else {
		document.getElementById("pContainer").style.display = "block";
	}
}

// https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_todo

function newElement2(){
//	alert ("Add angeklickt");
	var name = document.getElementById("nameInput").value;

	if (name === '') {
		alert ("Ungültiger Name!");
	} else  {
	//	document.getElementById("myTable").appendChild(th);
		input(); //schließt PopUp

		placeOnTable2(name);
	}

}




function placeOnTable2(name){
	var nDiv = document.createElement('div');
	nDiv.className = "note"
	nDiv.setAttribute( 'draggable', true);
	nDiv.setAttribute('ondragstart',"drag(event)");
	nDiv.id = "drag4";
	nDiv.setAttribute('onclick',"location.href='modulpage.html';");

	nDiv.innerHTML = name;

	document.getElementById('t-11').appendChild( nDiv );



}//*/
