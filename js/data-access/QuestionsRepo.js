export default class QuestionRepo {
	constructor() {
		this.version = 1;
		const request = window.indexedDB.open("questions", this.version);

		request.onupgradeneeded = () => {
			const db = request.result;

			if (db.objectStoreNames.contains("question")) db.deleteObjectStore("question");

			const store = db.createObjectStore("question", { autoIncrement: true });
			store.createIndex("category", ["category"], { unique: false });
			store.createIndex("period", ["period"], { unique: false });
			store.createIndex("last_success", ["last_success"], { unique: false });

			db.close;
		};
	}

	queryData() {
		const request = window.indexedDB.open("questions");
		request.onsuccess = () => {
			const db = request.result;
			const tran = db.transaction("question", "readwrite");
			const store = tran.objectStore("question");

			// Get by keyPath
			const idQuery = store.get(1);
			idQuery.onsuccess = () => {
				console.log("Id: ", idQuery.result);
			};

			// Get by specific index.
			const category = store.index("category");
			const categoryQuery1 = category.getAll(["Test 1"]);
			categoryQuery1.onsuccess = () => {
				console.log("Test 1: ", categoryQuery1.result);
			};

			const categoryQuery2 = category.get(["Test 1"]);
			categoryQuery2.onsuccess = () => {
				console.log("First Test 1: ", categoryQuery2.result);
			};
		};
	}

	deleteQuestion(id){
		const request = window.indexedDB.open("questions");
		request.onsuccess = () => {
			const db = request.result;
			const tran = db.transaction("question", "readwrite");
			const store = tran.objectStore("question");
			store.delete(id);
		}
	}

	clearData(){
		const request = window.indexedDB.open("questions");
		request.onsuccess = () => {
			const db = request.result;
			const tran = db.transaction("question", "readwrite");
			const store = tran.objectStore("question");
			store.clear();
		}
	}

	addQuestion(question){
		const request = window.indexedDB.open("questions");
		request.onsuccess = () => {
			const db = request.result;
			const tran = db.transaction("question", "readwrite");
			const store = tran.objectStore("question");

			store.put({
				period: question.period,
				last_success: question.last_success,
				eligible_on: question.eligible_on,
				category: question.category,
				type: question.type,
				question: question.question,
				correct_answers: question.correct_answers,
				incorrect_answers: question.incorrect_answers
			});
		}
	}

	importJson(imported_JSON) {
		let json = JSON.parse(imported_JSON);
		json.questions.forEach(question => {
			this.addQuestion(question);
		});
	}

	getJson(){
		const promise =  new Promise((resolve)=>{
			const request = window.indexedDB.open("questions");
			request.onsuccess = () => {
				const db = request.result;
				const tran = db.transaction("question", "readwrite");
				const store = tran.objectStore("question");
				const idQuery = store.getAll();

				idQuery.onsuccess = () => {
					if(idQuery.result){
						const res = {"date generated": new Date(), "questions": idQuery.result};
						resolve(JSON.stringify(res, null, 4));
					}
				};
			};
		});
		return promise;
	}

	getNextQuestion(category){
		
	}
}