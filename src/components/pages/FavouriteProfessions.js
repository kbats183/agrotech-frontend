import SimplePage from "../SimplePage";
import {ProfessionSmallCard} from "../ProfessionCard";
import {useContext, useEffect, useState} from "react";
import {
    addProfessionFavourite,
    deleteProfessionFavourite, getAllFavouriteProfessions,
    getProfessionByID
} from "../../service/professions";
import {AccountContext} from "../../service/accounts";
import {Typography} from "@mui/material";

export default function FavouriteProfessions() {
    const {account} = useContext(AccountContext);
    const [professions, setProfessions] = useState();
    const loadProfessions = () => {
        getAllFavouriteProfessions(account?.login).then(prs => setProfessions(prs));
    };
    useEffect(loadProfessions, [account]);
    const changeRating = (professionID, newRating) => {
        setProfessions(prs => prs.map(pr => pr.id === professionID ? {...pr, is_favourite: newRating} : pr));
        (newRating === 1 ? addProfessionFavourite : deleteProfessionFavourite)(account.login, professionID)
            .then(() => getProfessionByID(professionID, account.login))
            .then(newPr => setProfessions(prs => prs.map(pr => pr.id === professionID ? newPr : pr)));
    }

    return (<SimplePage title="Понравившиеся профессии">
        {professions !== undefined && professions
            .map(profession => <ProfessionSmallCard key={profession.id} changeRating={changeRating} {...profession}/>)}
        {professions?.length === 0 && <Typography variant="h5">У вас пока выбрана нет понравившихся профессий</Typography>}
        {professions?.length === 0 && <Typography>Откройте список всех профессий и пометьте понравившиеся звездочкой напрости в названия.</Typography>}
    </SimplePage>);
}
