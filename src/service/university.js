import {API_PATH} from "../config";

const apiPath = API_PATH + "university/"

export const getAllUniversity = () =>
    fetch(apiPath)
        .then(r => r.json());

export const getUniversityByID = (id) =>
    fetch(apiPath + id)
        .then(r => r.json());

