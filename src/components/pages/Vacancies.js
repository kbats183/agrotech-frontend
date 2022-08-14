import SimplePage from "../SimplePage";
import { useEffect, useState} from "react";
import {VacancyCard} from "../VacancyCard";
import {getAllVacancies} from "../../service/vacancies";

export default function Vacancies() {
    // const {account} = useContext(AccountContext);
    const [vacancies, setVacancies] = useState([]);
    const loadUniversityList = () => {
        getAllVacancies().then(setVacancies);
    };
    useEffect(loadUniversityList, []);
    // const changeRating = (professionID, newRating) => {
    //     setProfessions(prs => prs.map(pr => pr.id === professionID ? {...pr, is_favourite: newRating} : pr));
    //     (newRating === 1 ? addProfessionFavourite : deleteProfessionFavourite)(account.login, professionID)
    //         .then(() => getProfessionByID(professionID, account.login))
    //         .then(newPr => setProfessions(prs => prs.map(pr => pr.id === professionID ? newPr : pr)));
    //         .then(newPr => setProfessions(prs => prs.map(pr => pr.id === professionID ? newPr : pr)));
    // }

    return (<SimplePage title="Вакансии">
        {vacancies !== undefined && vacancies
            .map(v => <VacancyCard key={v.id} {...v}/>)}
    </SimplePage>);
}
