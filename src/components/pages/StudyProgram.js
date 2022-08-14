import SimplePage from "../SimplePage";
import {StudyProgramInfo} from "../StudyProgramCard";
import {useEffect, useContext, useState} from "react";
import AccountContext from "../../service/accounts";
import {
    addStudyProgramFavourite,
    deleteStudyProgramFavourite,
    getStudyProgramByID,
} from "../../service/study_programs";
import {useParams} from "react-router-dom";

export const StudyProgram = () => {
    const {account} = useContext(AccountContext);
    const {id} = useParams();
    const [studyProgram, setStudyProgram] = useState();
    useEffect(() => {
        getStudyProgramByID(id, account?.login ?? "").then(setStudyProgram);
    }, [account, id]);
    const changeRating = (professionID, newRating) => {
        setStudyProgram(pr => ({...pr, is_favourite: newRating}));
        (newRating === 1 ? addStudyProgramFavourite : deleteStudyProgramFavourite)(account.login, professionID)
            .then(() => getStudyProgramByID(professionID, account.login))
            .then(newPr => setStudyProgram(newPr));
    }

    return (<SimplePage title={"Образовательная программа"}>

        {/*<Typography variant="h5">*/}
        {/*    Список направлений обучения для понравившихся профессий*/}
        {/*</Typography>*/}

        {studyProgram && <StudyProgramInfo key={studyProgram.id} {...studyProgram} changeRating={changeRating}/>}
    </SimplePage>);
}

export default StudyProgram;
