import SimplePage from "../SimplePage";
import {useContext, useEffect, useState} from "react";
import {AccountContext} from "../../service/accounts";
import {getAllUniversity} from "../../service/university";
import {UniversityCard} from "../UniversityCard";

export default function UniversityList() {
    const {account} = useContext(AccountContext);
    const [universityList, setUniversityList] = useState([]);
    const loadUniversityList = () => {
        getAllUniversity(account?.login).then(prs => setUniversityList(prs));
    };
    useEffect(loadUniversityList, [account]);
    // const changeRating = (professionID, newRating) => {
    //     setProfessions(prs => prs.map(pr => pr.id === professionID ? {...pr, is_favourite: newRating} : pr));
    //     (newRating === 1 ? addProfessionFavourite : deleteProfessionFavourite)(account.login, professionID)
    //         .then(() => getProfessionByID(professionID, account.login))
    //         .then(newPr => setProfessions(prs => prs.map(pr => pr.id === professionID ? newPr : pr)));
    // }

    return (<SimplePage title="Все профессии">
        {universityList !== undefined && universityList
            .map(u => <UniversityCard key={u.id} {...u}/>)}
    </SimplePage>);
}
