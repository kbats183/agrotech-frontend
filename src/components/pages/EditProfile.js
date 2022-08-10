import {useState} from "react";
import PropTypes from 'prop-types';
import {useNavigate} from "react-router-dom";
import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormLabel, Radio,
    RadioGroup,
    Tab,
    Tabs,
    TextField,
    Typography
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import SimplePage from "../SimplePage";

const FormLine = ({children, ...props}) =>
    (<Box sx={{maxWidth: 500, my: 2, ...props}}>
        {children}
    </Box>);
FormLine.propTypes = {
    children: PropTypes.node
};

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

export default function EditProfile() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        lastName: "Петров",
        firstName: "Николай",
        patronymic: "Иванович",
        region: "Ленинградская область",
        step: 0,
        schoolClass: 9,
    });

    return (<SimplePage title="Изменить профиль">
        <FormLine><TextField
            required
            id="outlined-required"
            label="Фамилия"
            defaultValue={data.lastName}
            fullWidth
        /></FormLine>
        <FormLine><TextField
            required
            id="outlined-required"
            label="Имя"
            defaultValue={data.firstName}
            fullWidth
        /></FormLine>
        <FormLine><TextField
            required
            id="outlined-required"
            label="Отчество"
            defaultValue={data.patronymic}
            fullWidth
        /></FormLine>

        <FormLine>
            <FormControl>
                <RadioGroup row value={"scholar"}>
                    <FormControlLabel value="scholar" control={<Radio/>} label="Школьник"/>
                    <FormControlLabel value="entrant" control={<Radio/>} label="Выпускник школы"/>
                    <FormControlLabel value="student" control={<Radio/>} label="Студент"/>
                </RadioGroup>
            </FormControl>
        </FormLine>

        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
            <Tabs value={data.step} onChange={(_, s) => setData(d => ({...d, step: s}))}>
                <Tab label="Школьник"/>
                <Tab label="Выпускник"/>
                <Tab label="Студент"/>
            </Tabs>
        </Box>
        <TabPanel value={data.step} index={0}>
            <FormLine><TextField
                required
                id="outlined-required"
                label="Класс в школе"
                inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
                defaultValue={data.schoolClass}
                fullWidth
            /></FormLine>
        </TabPanel>
        <TabPanel value={data.step} index={1}>
            Item Two
        </TabPanel>
        <TabPanel value={data.step} index={2}>
            Item Three
        </TabPanel>

        <Box sx={{mt: 1, mb: 2}}>
            <Button variant="contained" endIcon={<SaveIcon/>}
                    onClick={() => navigate("/profile")}>Сохранить</Button>
        </Box>

    </SimplePage>);
}
