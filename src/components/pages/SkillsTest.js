import SimplePage from "../SimplePage";
import {ProfessionCard} from "../ProfessionCard";
import {useParams} from "react-router-dom";
import {professions} from "./Professions";
import {Button, Grid, Slider} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

const skillSliderLabelDescribe = value => {
    switch (value) {
        case 0:
            return "Точно нет";
        case 1:
            return "Скорее нет";
        case 3:
            return "Скорее да";
        case 4:
            return "Точно да";
        default:
            return "Не знаю";
    }
}

const SkillSlider = (props) =>
    (<Slider
        defaultValue={2}
        valueLabelDisplay="auto"
        valueLabelFormat={skillSliderLabelDescribe}
        step={1}
        marks
        min={0}
        max={4}
        {...props}
    />);

const TestQuestion = ({question, ...props}) =>
    (<Grid container spacing={2} sx={{my: 2}}>
        <Grid item xs={8}>
            {question}
        </Grid>
        <Grid item xs={4}>
            <SkillSlider {...props}/>
        </Grid>
    </Grid>);

const questions = [
    "Мне присущи лидерские качества",
    "Я умею работать в команде",
    "Я хорошо разбираюсь в математике и физике",
    "Я легко переношу нагрузки, мне свойственна выносливость",
    "Я люблю природу"
]

export default function SkillsTest() {
    return (<SimplePage title="Тест на способности">
        {questions.map((q, index) => <TestQuestion key={index} question={q}/>)}
        <Button variant="contained" endIcon={<SaveIcon/>}
                onClick={() => {}}>Сохранить</Button>
    </SimplePage>);
}
