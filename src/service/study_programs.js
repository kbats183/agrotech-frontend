import {API_PATH} from "../config";

const apiPath = API_PATH + "study_program/"

export const getStudyProgramsByProfessionID = (professionID, login) =>
    (login === undefined ? fetch(apiPath + "profession/" + professionID)
        : fetch(apiPath + "profession/" + professionID + "/favourite/" + login))
        .then(r => r.json());

export const getStudyProgramsForFavouriteProfessions = (login) =>
    fetch(apiPath + "favourite/" + login)
        .then(r => r.json());

export const getStudyProgramByID = (id, login) =>
    fetch(apiPath + id + "/favourite/" + login)
        .then(r => r.json());

export const addStudyProgramFavourite = (login, programID) =>
    fetch(apiPath + programID + "/favourite/" + login, {method: "POST"});

export const deleteStudyProgramFavourite = (login, programID) =>
    fetch(apiPath + programID + "/favourite/" + login, {method: "DELETE"});
