import QuestionsRepo from "./data-access/QuestionsRepo.js";
import FileManager from "./data-access/FileManager.js";

const questions = new QuestionsRepo();
const fileManager = new FileManager();

document.querySelector("#import-from-dialog").addEventListener("click", ()=>{
    const json = document.querySelector("#import-panel").value;
    console.log(json);
    questions.importJson(json);
    document.querySelector("#import-dialog").close();
});

document.querySelector("#import-data-button").addEventListener("click", ()=>{
    document.querySelector("#import-dialog").showModal();
});

document.querySelector("#download-data-button").addEventListener("click", ()=>{
    questions.getJson()
    .then(fileManager.downloadToFile);
});

//Import Modal Buttons

document.querySelector("#cancel-import-dialog").addEventListener("click", ()=>{
    document.querySelector("#import-dialog").close();
});


document.querySelector("#clear-data-button").addEventListener("click", ()=>{
    questions.clearData();
});
