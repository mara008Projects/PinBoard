
// https://javascript.info/indexeddb
// -> "That power is usually excessive for traditional client-server apps. IndexedDB is intended for offline apps, to be combined with ServiceWorkers and other technologies."

// function startIDB(){
	let deleteRequest = indexedDB.deleteDatabase("pinDB");
	let openRequest = indexedDB.open("pinDB",1);
	
	openRequest.onupgradeneeded = function(){
		//alert("start");
		
		let db = openRequest.result;
		
		let pStore 		= db.createObjectStore(	'Projekte', {keyPath: 'id'}	);
		let pTitle    	= pStore.createIndex("by_pName", "pName");
		let pPosition 	= pStore.createIndex("by_pPos" , "pPos");
		
		
		/*
		db.transaction(	"Projekte", "readwrite");
		let projects = transaction.ojectStore("Projekte");
		let project = {
			id: '01', 
			name: "Test-01",
			position: "t-11"
		};
		
		let request = projects.add(project);
			request.onsuccess = function(){
				console.log("Project added to the store", request.result);
			};
			request.onerror = function(){
				console.log("Error", request.error);
			};
		*/
		
	}
	
	openRequest.onerror = function(){
		console.error("Error", openrequest.error);
		alert ("Error");
	}
	
	openRequest.onsuccess = function(){
		let db = openRequest.result;
		//alert ("success");
		addData();
		
		var transaction = db.transaction( ["Projekte"]);
			transaction.oncomplete = function(e){ alert("Hat prima funktioniert ^^ "); };
			transaction.onerror = function(e){ alert("Fehler: "+e)};
		var projekte = transaction.objectStore("Projekte");
		// var namen	 = projekte.index("by_pName");
		var plaetze	 = projekte.index("by_pPos");
		
		var request = plaetze.openCursor();
			request.onsuccess = function(){
				let cursor = request.result;
				if (cursor){
					let key = cursor.key; // book key (id field)
					let value = cursor.value; // book object
					console.log(key, value);
						placeOnTable("Testoo",key);
					cursor.continue();
				} else {
					console.log("No more books");
				}
			};
	}
	
	
	
	
	
	function addData(){
				// https://developer.mozilla.org/en-US/docs/Web/API/IDBTransaction/error
		let db = openRequest.result;
		
		var newItem = [ { id: '01', pName: "Test-01", pPos: "t-11" } ];
		
		var transaction = db.transaction( ["Projekte"], "readwrite" );
			transaction.oncomplete = function(e){ alert("Got sei dank, es hat endlich geklappt"); };
			transaction.onerror = function(e){ alert("Fehler: "+e)};
		
		var objectStore = transaction.objectStore("Projekte");
		var objectStoreRequest = objectStore.add(newItem[0]);
			objectStoreRequest.onsuccess = function(e){ alert("Geklappt")};
	}
// }


function placeOnTable(name,pos){
	var nDiv = document.createElement('div');
	nDiv.className = "note"
	nDiv.setAttribute( 'draggable', true);
	nDiv.setAttribute('ondragstart',"drag(event)");
	nDiv.id = "drag4";
	nDiv.setAttribute('onclick',"location.href='prototype01.html';");
					
	nDiv.innerHTML = name;
	
	document.getElementById(pos).appendChild( nDiv );
	
	
}
