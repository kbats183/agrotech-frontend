import {API_PATH} from "../config";

const apiPath = API_PATH + "professions/"

export const getAllProfessions = (login) =>
    (login ? fetch(apiPath + "favourite/" + login) : fetch(apiPath))
        .then(r => r.json());

export const getProfessionByID = (id, login) =>
    (login ? fetch(apiPath + id + "/favourite/" + login) : fetch(apiPath + id))
        .then(r => r.json());

export const addProfessionFavourite = (login, professionID) =>
    fetch(apiPath + professionID + "/favourite/" + login, {method: "POST"});

export const deleteProfessionFavourite = (login, professionID) =>
    fetch(apiPath + professionID + "/favourite/" + login, {method: "DELETE"});
