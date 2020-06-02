//*https://www.w3.org/TR/IndexedDB/

function testIDB(){
//	alert ("Test begonnen");

	window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || 
	window.msIndexedDB;
 
	window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || 
	window.msIDBTransaction;
	window.IDBKeyRange = window.IDBKeyRange || 
	window.webkitIDBKeyRange || window.msIDBKeyRange
 
	if (!window.indexedDB) {
		window.alert("Your browser doesn't support a stable version of IndexedDB.")
	} else {
		window.alert("Your browser does support a stable version of IndexedDB. Yey ")
	}

	var request = indexedDB.open("library");


	request.onupgradeneeded = function() {
		// The database did not previously exist, so create object stores and indexes.
		alert ("Library doesnt existr jet");
		var db = request.result;
		var store = db.createObjectStore("books", {keyPath: "isbn"});
		var titleIndex = store.createIndex("by_title", "title", {unique: true});
		var authorIndex = store.createIndex("by_author", "author");

		// Populate with initial data.
		store.put({title: "Quarry Memories", author: "Fred", isbn: 123456});
		store.put({title: "Water Buffaloes", author: "Fred", isbn: 234567});
		store.put({title: "Bedrock Nights", author: "Barney", isbn: 345678});
		alert ("library is set up");
	};

	request.onsuccess = function() {
		db = request.result;
		alert (db.);
	};

	request.onerror = function(e) {
		alert ("an error ocured: "+e.target.errorCode);
	}
}

//  The following example populates the database using a transaction.

var tx = db.transaction("books", "readwrite");
var store = tx.objectStore("books");

store.put({title: "Quarry Memories", author: "Fred", isbn: 123456});
store.put({title: "Water Buffaloes", author: "Fred", isbn: 234567});
store.put({title: "Bedrock Nights", author: "Barney", isbn: 345678});

tx.oncomplete = function() {
  // All requests have succeeded and the transaction has committed.
};




// The following example looks up all books in the database by author using an index and a cursor.

var tx = db.transaction("books", "readonly");
var store = tx.objectStore("books");
var index = store.index("by_author");

var request = index.openCursor(IDBKeyRange.only("Fred"));
request.onsuccess = function() {
  var cursor = request.result;
  if (cursor) {
    // Called for each matching record.
    report(cursor.value.isbn, cursor.value.title, cursor.value.author);
    cursor.continue();
  } else {
    // No more matching records.
    report(null);
  }
};
