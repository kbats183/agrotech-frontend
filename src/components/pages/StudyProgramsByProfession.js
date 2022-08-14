import SimplePage from "../SimplePage";
import {Typography} from "@mui/material";
import {StudyProgramCard} from "../StudyProgramCard";
import {useEffect, useContext, useState} from "react";
import AccountContext from "../../service/accounts";
import {
    addStudyProgramFavourite,
    deleteStudyProgramFavourite, getStudyProgramByID, getStudyProgramsByProfessionID,
} from "../../service/study_programs";
import {useParams} from "react-router-dom";
import {getProfessionByID} from "../../service/professions";

export const StudyProgramsByProfession = () => {
    const {account} = useContext(AccountContext);
    const {profession_id} = useParams();
    const [profession, setProfession] = useState();
    const [studyPrograms, setStudyPrograms] = useState();
    useEffect(() => {
        Promise.all([getStudyProgramsByProfessionID(profession_id, account?.login), getProfessionByID(profession_id)])
            .then(([sp, p]) => {
                setStudyPrograms(sp);
                setProfession(p)
            });
    }, [profession_id, account]);
    const changeRating = (program, newRating) => {
        setStudyPrograms(prs => prs.map(pr => pr.id === program ? {...pr, is_favourite: newRating} : pr));
        (newRating === 1 ? addStudyProgramFavourite : deleteStudyProgramFavourite)(account?.login, program)
            .then(() => getStudyProgramByID(program, account?.login))
            .then(newPr => setStudyPrograms(prs => prs.map(pr => pr.id === program ? newPr : pr)));
    }

    return (<SimplePage title={"Образовательные программы"}>
        {studyPrograms?.length > 0 && <Typography variant="h5">
            Список направлений обучения
            {profession && " профессии «" + profession.name + "»"}
        </Typography>}
        {studyPrograms?.length > 0 && studyPrograms.map((p, index) =>
            <StudyProgramCard key={index} {...p} changeRating={changeRating}/>)}
    </SimplePage>);
}

export default StudyProgramsByProfession;
