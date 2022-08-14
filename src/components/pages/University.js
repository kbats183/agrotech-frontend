import SimplePage from "../SimplePage";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getUniversityByID} from "../../service/university";
import {UniversityInfo} from "../UniversityCard";

export const StudyProgram = () => {
    // const {account} = useContext(AccountContext);
    const {id} = useParams();
    const [university, setUniversity] = useState();
    useEffect(() => {
        getUniversityByID(id).then(setUniversity);
    }, [id]);
    // const changeRating = (professionID, newRating) => {
    //     setStudyProgram(pr => ({...pr, is_favourite: newRating}));
    //     (newRating === 1 ? addStudyProgramFavourite : deleteStudyProgramFavourite)(account.account.login, professionID)
    //         .then(() => getStudyProgramByID(professionID, account.account.login))
    //         .then(newPr => setStudyProgram(newPr));
    // }

    return (<SimplePage title={"Университет"}>
        {university && <UniversityInfo {...university}/>}
    </SimplePage>);
}

export default StudyProgram;
