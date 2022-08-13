import {Box, Grid, Slider, Stack} from "@mui/material";
import {NavigateBefore, NavigateNext} from "@mui/icons-material";
import {useContext, useEffect, useState} from "react";
import {addTestAnswer, getTestAnswers, getTestByID} from "../service/tests";
import AccountContext from "../service/accounts";
import LoadingButton from "@mui/lab/LoadingButton";
import {useNavigate} from "react-router-dom";

const skillSliderLabelDescribe = value => {
    switch (value) {
        case -2:
            return "Точно нет";
        case -1:
            return "Скорее нет";
        case 1:
            return "Скорее да";
        case 2:
            return "Точно да";
        default:
            return "Не знаю";
    }
}

export const SkillSlider = (props) =>
    (<Slider
        valueLabelDisplay="on"
        valueLabelFormat={skillSliderLabelDescribe}
        step={1}
        marks
        min={-2}
        max={2}
        {...props}
    />);

export const TestQuestion = ({question, ...props}) =>
    (<Grid container spacing={2} sx={{my: 2}}>
        <Grid item xs={8}>
            {question}
        </Grid>
        <Grid item xs={4}>
            <SkillSlider {...props}/>
        </Grid>
    </Grid>);

const testID = 1;
export const Test = () => {
    const account = useContext(AccountContext);
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [saveAnswerProcess, setSaveAnswerProcess] = useState(true);
    useEffect(() => {
        if (account.account) {
            setSaveAnswerProcess(true);
            Promise.all([getTestByID(testID), getTestAnswers(testID, account.account.login)])
                .then(([test, ans]) => {
                    setQuestions(test.questions);
                    setAnswers(ans);
                    setSaveAnswerProcess(false);
                })
        }
    }, [account.account]);
    const lastQuestionNumber = questions.length - 1;
    const [questionCounter, setQuestionCounter] = useState(0);
    const currentQuestion = questions[questionCounter];

    const [currentQuestionAnswer, setCurrentQuestionAnswer] = useState(0);
    useEffect(() => {
        setCurrentQuestionAnswer(answers.find(a => a.question_id === currentQuestion?.id)?.answer ?? 0);
    }, [currentQuestion, answers]);

    const saveAnswer = (question_id, answer) => {
        setSaveAnswerProcess(true);
        return addTestAnswer(testID, account.account?.login, {question_id, answer})
            .then(() => {
                setSaveAnswerProcess(false);
                setAnswers(ans => ans.map(a => ({
                    ...a,
                    answer: ans.question_id === currentQuestion.id ? currentQuestionAnswer : a.answer
                })));
            })
    }

    const previousQuestion = () => {
        saveAnswer(currentQuestion.id, currentQuestionAnswer)
            .then(() => setQuestionCounter(q => Math.max(q - 1, 0)));
    }
    const nextQuestion = () => {
        saveAnswer(currentQuestion.id, currentQuestionAnswer)
            .then(() => {
                if (questionCounter === lastQuestionNumber) {
                    navigate("/chooseProfession");
                    return;
                }
                setQuestionCounter(q => Math.min(q + 1, lastQuestionNumber));
            });
    }

    return (<Box>
        {currentQuestion &&
            <TestQuestion question={currentQuestion.text} value={currentQuestionAnswer}
                          onChange={(_, v) => setCurrentQuestionAnswer(v)}/>}
        <Stack direction="row" display="flex" justifyContent="space-between" alignItems="center" sx={{mt: 4}}>
            <LoadingButton
                variant="contained"
                startIcon={<NavigateBefore/>}
                loading={saveAnswerProcess}
                loadingPosition="start"
                disabled={questionCounter === 0}
                onClick={previousQuestion}>Предыдущий</LoadingButton>
            <LoadingButton
                variant="contained"
                endIcon={<NavigateNext/>}
                loading={saveAnswerProcess}
                loadingPosition="end"
                onClick={nextQuestion}>
                {questionCounter === lastQuestionNumber ? "Результаты" : "Следующий"}
            </LoadingButton>
        </Stack>

    </Box>);
}
