
//qID, questionText, studentAnswer, result


function testIDB(){
	alert ("Test begonnen");
window.indexedDB = window.indexedDB;

/* */  

let request = window.indexedDB.open("QuizQuestDatabase",1), db, tx, store, index;


request.onupgradeneeded = function(e){
	alert ("upgrade needed gestartet");
	let db = request.result,
		store = db.createObjectStore("QuestionsStore", {keyPath: "qID"} ), 
		index = store.createIndex("questionText","questionText",{unique: false});
};



request.onerror = function(e){
	alert ("Error: " + e.target.errorCode);
};

request.onsuccess = function(e){
	alert ("DB-Test started!");
	db =  request.result;
	tx = db.transaction("QuestionsStore","readwrite");
	store = tx.objectStore("QuestionsStore");
	index = store.index("questionText");
	
	db.onerror = function(e) {
		console.log("ERROR: " + e.target.errorCode);
	}
	
	store.put( { qID: 1, 
				 questionText: "Sky is blue.",
				 correctAnswer: true,
				 studentAnswer: true,
				 result: true } ) ;
	store.put( { qID: 2, 
				 questionText: "grass is green.",
				 correctAnswer: true,
				 studentAnswer: true,
				 result: true } ) ;
	
	let q1 = store.get(1);
	let qs = index.get("grass is green.");
	
	q1.onsuccess = function(){
		alert(q1.result);
		alert(q1.result.questionText);
	}
	
	
	tx.oncomplete = function() {
		db.close();
	}
}
}