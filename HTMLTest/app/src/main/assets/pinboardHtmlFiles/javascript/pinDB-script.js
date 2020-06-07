/* *********** Datenbank Anbindung ************** */
var pinBoardDB;

function startDB(){
	//alert ("scrip gestartet");
	//placeOnTable("scrip gestartet");
/*
	if (!('indexedDB' in window)) {
		alert ("IndexedDB is not supportet :(");
		return;
	}else{
		alert ("IndexedDB is supportet :D");
	}
*/
	pinDB = indexedDB.open("PinDB",1);

	pinDB.onupgradeneeded = function(){
		alert (" firstTime Use");
		placeOnTable(" firstTime Use");
	
		var db 		  = pinDB.result;
		var pStore    = db.createObjectStore("projekte", {keyPath: "pID"});
		var pTitle    = pStore.createIndex("by_pName", "pName");
		var pPosition = pStore.createIndex("by_pPos" , "pPos");
	/*
		var tx = db.transaction("projekte", "readwrite");
		var store = tx.objectStore("projekte");
	*/
	//	var store = db.transaction("projekte", "readwrite").objectStore("projekte");
	var transaction = db.transaction([],  IDBTransaction.READ_WRITE, 2000);
	    transaction.oncomplete = function(){
	      console.log("Success transaction");
	    };
	var objectStore = transaction.objectStore('projekte');

	//var customerObjectStore = db.transaction("customers", "readwrite").objectStore("customers");

		store.put ( { pID: 1, pName: "Test01", pPos: 't-22' } ) ;
		store.put ( { pID: 2, pName: "Test02", pPos: 't-13' } ) ;
		alert ("Inhalte Plaziert");
		placeOnTable(" Inhalte Plaziert");
	}


	pinDB.onsuccess = function(){
		var db = pinDB.result;

			alert ("db aufruf start");
		var tx = db.transaction("projekte", "readonly");
			alert ("var tx = db.transaction( projekte , readonly ); erfolgreich");
		var projectStore = tx.objectStore("projekte")
			alert ("projekte geladen");
		var index = projectStore.index("by_pName");
			alert ("variablen aufgesetzt");
		var request = index.openCursor(IDBKeyRange.only("Test01"));
		request.onsuccess = function(){
			var cursor = request.result;
			if(cursor){
				alert ("-"+cursor.value.pID+"-"+cursor.value.pName+"-"+cursor.value.pPos);
				report(cursor.value.isbn, cursor.value.title, cursor.value.author);
				cursor.continue();
			} else {
				alert (" No more matching records.");
			report(null);
			}
		};

	}

	pinDB.onerror = function(e){
		placeOnTable( "Ein Fehler ist aufgetreten: "+e.target.errorCode);
		alert ("Ein Fehler ist aufgetreten: "+e.target.errorCode);
	}
}





function placeOnTable(name){
	var nDiv = document.createElement('div');
	nDiv.className = "note"
	nDiv.setAttribute( 'draggable', true);
	nDiv.setAttribute('ondragstart',"drag(event)");
	nDiv.id = "drag4";
	nDiv.setAttribute('onclick',"location.href='prototype01.html';");
					
	nDiv.innerHTML = name;
	
	document.getElementById('t-33').appendChild( nDiv );
	
	
}