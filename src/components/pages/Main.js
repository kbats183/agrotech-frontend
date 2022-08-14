import SimplePage from "../SimplePage";
import {Typography} from "@mui/material";
import {Work, School, TrendingUp} from "@mui/icons-material";
import SimpleTimeline from "../SimpleTimeline";

export default function Main() {
    return (<SimplePage>
        <Typography variant="h4">Стань специалистом в агротехнической области!</Typography>
        <Typography>
            Сельское хозяйство в XXI веке стремительно развивает. Как никогда эта отрасаль нуждается в
            квалифицированных кадры.
        </Typography>
        <Typography>
            Этот сервис поможет с выбором професии, образовательной программы, учебного заведения и будущего работодателя.
        </Typography>
        <SimpleTimeline withIcon={true} elements={[
            {
                text: ["Развивай свои навыки и способности",
                    <Typography variant="title" component="p">Школьник старших класссов</Typography>],
                icon: <TrendingUp color="primary"/>,
            },
            {
                text: ["Выбери подходящую профессию",
                    <Typography variant="title" component="p">Выпускник школы</Typography>],
                icon: <School color="primary"/>,
            },
            {
                text: ["Учись и проходи практику у потенциальных работодателей",
                    <Typography variant="title" component="p">Студент</Typography>],
                icon: <Work color="primary"/>,
            },
        ]}/>
    </SimplePage>);
}
