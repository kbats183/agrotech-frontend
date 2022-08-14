import SimplePage from "../SimplePage";
import {ProfessionInfo} from "../ProfessionCard";
import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {addProfessionFavourite, deleteProfessionFavourite, getProfessionByID} from "../../service/professions";
import AccountContext from "../../service/accounts";
import {getStudyProgramsByProfessionID} from "../../service/study_programs";

export default function Profession() {
    const {id} = useParams();
    const account = useContext(AccountContext);
    const [profession, setProfession] = useState();
    const [studyPrograms, setStudyPrograms] = useState();
    useEffect(() => {
        getProfessionByID(id, account.account?.login).then(setProfession)
    }, [id, account.account]);
    useEffect(() => {
        getStudyProgramsByProfessionID(id).then(setStudyPrograms);
    }, [id]);
    const changeRating = (professionID, newRating) => {
        setProfession(pr => ({...pr, is_favourite: newRating}));
        (newRating === 1 ? addProfessionFavourite : deleteProfessionFavourite)(account.account.login, professionID)
            .then(() => getProfessionByID(professionID, account.account.login))
            .then(newPr => setProfession(newPr));
    }

    return (<SimplePage title="Професия">
        {profession && <ProfessionInfo changeRating={changeRating} studyPrograms={studyPrograms} {...profession}/>}
    </SimplePage>);
}
