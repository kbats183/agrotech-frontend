import {API_PATH} from "../config";

const apiPath = API_PATH + "vacancy/"

export const getAllVacancies = (login) =>
    fetch(apiPath)
        .then(r => r.json());

