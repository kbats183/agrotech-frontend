import SimplePage from "../SimplePage";
import {Typography} from "@mui/material";
import {StudyProgramCard} from "../StudyProgramCard";
import {useEffect, useContext, useState} from "react";
import AccountContext from "../../service/accounts";
import {
    addStudyProgramFavourite,
    deleteStudyProgramFavourite, getStudyProgramByID,
    getStudyProgramsForFavouriteProfessions
} from "../../service/study_programs";

export const StudyPrograms = () => {
    const {account} = useContext(AccountContext);
    const [studyPrograms, setStudyPrograms] = useState();
    useEffect(() => {
        getStudyProgramsForFavouriteProfessions(account.login).then(setStudyPrograms);
    }, [account]);
    const changeRating = (program, newRating) => {
        setStudyPrograms(prs => prs.map(pr => pr.id === program ? {...pr, is_favourite: newRating} : pr));
        (newRating === 1 ? addStudyProgramFavourite : deleteStudyProgramFavourite)(account.login, program)
            .then(() => getStudyProgramByID(program, account.login))
            .then(newPr => setStudyPrograms(prs => prs.map(pr => pr.id === program ? newPr : pr)));
    }

    return (<SimplePage title={"Образовательные программы"}>
        {studyPrograms?.length > 0 && <Typography variant="h5">
            Список направлений обучения для понравившихся профессий
        </Typography>}
        {studyPrograms?.length > 0 && studyPrograms.map(p => <StudyProgramCard key={p.id} {...p} changeRating={changeRating}/>)}

        {studyPrograms?.length === 0 && <Typography variant="h5">У вас пока выбрана нет понравившихся профессий</Typography>}
        {studyPrograms?.length === 0 && <Typography>Откройте список всех профессий и пометьте понравившиеся звездочкой напрости в названия.</Typography>}
    </SimplePage>);
}

export default StudyPrograms;
