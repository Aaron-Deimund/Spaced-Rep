import QuestionsRepo from "./data-access/QuestionsRepo.js";

const questions = new QuestionsRepo();

document.querySelector("#add-data-button").addEventListener("click", questions.addData);
document.querySelector("#query-data-button").addEventListener("click", questions.queryData);
document.querySelector("#clear-data-button").addEventListener("click", questions.clearData);

