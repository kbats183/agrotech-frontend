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

export const professionImages = ["https://www.sgau.ru/files/pages/42774/1578630426general_pages_10_january_2020_i42774_selskoxozyaistvennoe_predpr.jpg",
    "https://ecochicken.ru/files/news/40/post_5d44984ce2b95.jpg",
    "https://rabotavidan.com/media/com_mtree/images/listings/o/23.jpg"
];

export default function Professions() {
    const account = useContext(AccountContext);
    const [professions, setProfessions] = useState([]);
    const loadProfessions = () => {
        getAllProfessions(account.account?.login).then(prs => setProfessions(prs));
    };
    useEffect(loadProfessions, [account.account]);
    const changeRating = (professionID, newRating) => {
        setProfessions(prs => prs.map(pr => pr.id === professionID ? {...pr, is_favourite: newRating} : pr));
        (newRating === 1 ? addProfessionFavourite : deleteProfessionFavourite)(account.account.login, professionID)
            .then(() => getProfessionByID(professionID, account.account.login))
            .then(newPr => setProfessions(prs => prs.map(pr => pr.id === professionID ? newPr : pr)));
    }

    return (<SimplePage title="Все профессии">
        {professions !== undefined && professions
            .map((e, ind) => ({...e, image: professionImages[ind % 3]}))
            .map(profession => <ProfessionSmallCard key={profession.id} changeRating={changeRating} {...profession}/>)}
    </SimplePage>);
}
