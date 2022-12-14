import SimplePage from "../SimplePage";
import {ProfessionSmallCard} from "../ProfessionCard";
import {useContext, useEffect, useState} from "react";
import {
    addProfessionFavourite,
    deleteProfessionFavourite,
    getAllProfessions,
    getProfessionByID
} from "../../service/professions";
import {AccountContext} from "../../service/accounts";

export default function Professions() {
    const {account} = useContext(AccountContext);
    const [professions, setProfessions] = useState([]);
    const loadProfessions = () => {
        getAllProfessions(account?.login).then(prs => setProfessions(prs));
    };
    useEffect(loadProfessions, [account]);
    const changeRating = (professionID, newRating) => {
        setProfessions(prs => prs.map(pr => pr.id === professionID ? {...pr, is_favourite: newRating} : pr));
        (newRating === 1 ? addProfessionFavourite : deleteProfessionFavourite)(account.login, professionID)
            .then(() => getProfessionByID(professionID, account.login))
            .then(newPr => setProfessions(prs => prs.map(pr => pr.id === professionID ? newPr : pr)));
    }

    return (<SimplePage title="Все профессии">
        {professions !== undefined && professions
            .map(profession => <ProfessionSmallCard key={profession.id} changeRating={changeRating} {...profession}/>)}
    </SimplePage>);
}
