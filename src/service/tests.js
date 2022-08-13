import {API_PATH} from "../config";

const apiPath = API_PATH + "tests/"

export const getTestByID = (id) =>
    fetch(apiPath + id)
        .then(r => r.json());

export const getTestAnswers = (testID, login) =>
    fetch(apiPath + testID + "/answers/" + login)
        .then(r => r.ok ? r.json() : []);

export const getTestAnswersCount = (testID, login) =>
    fetch(apiPath + testID + "/answers/" + login + "/count")
        .then(r => r.ok ? r.json() : []);

export const addTestAnswer = (testID, login, answer) =>
    fetch(apiPath + testID + "/answers/" + login, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(answer),
    });

export const getAllProfessionsByTest = (testID, login) =>
    fetch(apiPath + testID + "/professions/" + login)
        .then(r => r.json());
