import {useContext, useEffect, useState} from "react";
import AccountContext from "../../service/accounts";
import SimplePage from "../SimplePage";
import {getAllProfessionsByTest, getTestAnswersCount} from "../../service/tests";
import {Box, Button, Typography} from "@mui/material";
import {Quiz} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {ProfessionSmallCard} from "../ProfessionCard";
import {addProfessionFavourite, deleteProfessionFavourite, getProfessionByID} from "../../service/professions";

const testID = 1;

export const ChooseProfession = () => {
    const navigate = useNavigate();
    const {account} = useContext(AccountContext);
    const [answersCount, setAnswersCount] = useState(undefined);
    useEffect(() => {
        if (account) {
            getTestAnswersCount(testID, account?.login)
                .then(cnt => setAnswersCount(cnt));
        }
    }, [setAnswersCount, account]);
    const [professions, setProfessions] = useState(undefined);
    const changeRating = (professionID, newRating) => {
        setProfessions(prs => prs.map(pr => pr.id === professionID ? {...pr, is_favourite: newRating} : pr));
        (newRating === 1 ? addProfessionFavourite : deleteProfessionFavourite)(account.login, professionID)
            .then(() => getProfessionByID(professionID, account.login))
            .then(newPr => setProfessions(prs => prs.map(pr => pr.id === professionID ? newPr : pr)));
    }
    useEffect(() => {
        if (account !== undefined) {
            getAllProfessionsByTest(testID, account.login)
                .then(setProfessions);
        }
    }, [account]);

    return (<SimplePage title={"Тест способностей"}>
        {answersCount === 0 && <Box>
            <Typography variant={"h5"}>
                Выбери професиию мечты!
            </Typography>
            <Typography>
                Пройди тест, который поможет выбрать наиболие подходящую професиию.
            </Typography>
            <Box sx={{mt: 3}}>
                <Button
                    variant="contained"
                    endIcon={<Quiz/>}
                    onClick={() => navigate("/skillsTest")}>Пройти тест</Button>
            </Box>
        </Box>}

        {answersCount > 0 && <Box>
            <Typography variant={"h5"}>
                По результатам теста, больше всего вам подходят следующие професси
            </Typography>
            <Box sx={{mt: 2, mb: 3}}>
                <Button
                    variant="contained"
                    endIcon={<Quiz/>}
                    onClick={() => navigate("/skillsTest")}>Пройти тест повторно</Button>
            </Box>

            {professions && professions.map(profession =>
                <ProfessionSmallCard key={profession.id} changeRating={changeRating} {...profession}/>)}
        </Box>}
    </SimplePage>)
};

export default ChooseProfession;
