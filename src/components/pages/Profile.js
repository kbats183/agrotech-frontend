import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";

import {Alert, Box, Button, Divider, Stack, Tab, Tabs, TextField, Typography} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import {useNavigate} from "react-router-dom";
import SimplePage from "../SimplePage";
import QuizIcon from "@mui/icons-material/Quiz";
import FormLine from "../FormLine";
import TabPanel from "../TabPanel";
import LogoutIcon from "@mui/icons-material/Logout";
import {useState} from "react";

function Authorization({account}) {
    const [authMode, setAuthMode] = useState(0);
    const [loginLogin, setLoginLogin] = useState("");
    const [regData, setRegData] = useState({});
    const setRegField = (fieldName, format = x => x) =>
        (e) => setRegData(d => ({...d, [fieldName]: format(e.target.value)}));

    const [isInvalidLogin, setIsInvalidLogin] = useState(false);
    const login = () =>
        account.authorize(loginLogin).then(acc => setIsInvalidLogin(acc === undefined));

    const registration = () => account.registration(regData)
        .than(r => setIsInvalidRegistration(r === undefined));
    const [isInvalidRegistration, setIsInvalidRegistration] = useState(false);

    return (<SimplePage title="Профиль">
        {isInvalidLogin && <Alert severity="error">Не правильный логин!</Alert>}
        {isInvalidRegistration && <Alert severity="error">Ошибка при регистрации!</Alert>}

        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
            <Tabs value={authMode} onChange={(_, newValue) => setAuthMode(newValue)}>
                <Tab label="Войти"/>
                <Tab label="Зарегистрироваться"/>
            </Tabs>
        </Box>
        <TabPanel value={authMode} index={0}>
            <FormLine>
                <TextField
                    required
                    id="outlined-required"
                    label="Логин"
                    defaultValue={""}
                    onChange={(e) => setLoginLogin(e.target.value)}
                    fullWidth
                />
            </FormLine>

            <Box sx={{mt: 1, mb: 2}}>
                <Button variant="contained" onClick={login}>Войти</Button>
            </Box>
        </TabPanel>
        <TabPanel value={authMode} index={1}>
            <FormLine>
                <TextField
                    required
                    id="outlined-required"
                    label="Логин"
                    defaultValue={""}
                    onChange={setRegField("login")}
                    fullWidth
                />
            </FormLine>
            <FormLine>
                <TextField
                    required
                    label="Фамилия"
                    defaultValue={""}
                    onChange={setRegField("last_name")}
                    fullWidth
                />
            </FormLine>
            <FormLine>
                <TextField
                    required
                    label="Имя"
                    defaultValue={""}
                    onChange={setRegField("first_name")}
                    fullWidth
                />
            </FormLine>
            <FormLine>
                <TextField
                    required
                    label="Отчество"
                    defaultValue={""}
                    onChange={setRegField("patronymic")}
                    fullWidth
                />
            </FormLine>

            <Box sx={{mt: 1, mb: 2}}>
                <Button variant="contained" onClick={registration}>Зарегистрироваться</Button>
            </Box>
        </TabPanel>
    </SimplePage>);
}

function ProfileDetails({account}) {
    const navigate = useNavigate();
    const user = account.account;
    return (<SimplePage title="Профиль">
        <Typography variant="h4">{user.last_name} {user.first_name} {user.patronymic}</Typography>

        <Typography variant="h6">
            {user.step === 0 && "Школьник"}
            {user.step === 1 && "Выпускник"}
            {(user.step === 0 || user.step === 1) && (user.school_class && ", " + user.school_class + " класс")}
            {user.step === 2 && "Студент, "}
        </Typography>

        <Box sx={{mt: 1, mb: 2}}>
            <Stack direction="row" spacing={2}>
                <Button
                    variant="contained"
                    endIcon={<EditIcon/>}
                    onClick={() => navigate("/profile/edit")}>Изменить</Button>
                <Button
                    variant="contained"
                    endIcon={<LogoutIcon/>}
                    onClick={account.logout}>Выйти</Button>

            </Stack>
        </Box>

        {/*<Divider sx={{my: 1}}/>*/}

        {/*<Box>*/}
        {/*    <Typography variant="h6">Способности</Typography>*/}
        {/*    <Box sx={{mt: 1, mb: 2}}>*/}
        {/*        <Button component="button" variant="contained" onClick={() => navigate("/skillsTest")}*/}
        {/*                endIcon={<QuizIcon/>}>*/}
        {/*            Узнать*/}
        {/*        </Button>*/}
        {/*        /!*Одно, второе, третье и еще что-то.*!/*/}
        {/*    </Box>*/}
        {/*</Box>*/}

        {/*<Divider sx={{my: 1}}/>*/}

        {/*<Box>*/}
        {/*    <Typography variant="h6">Навыки</Typography>*/}
        {/*    <Typography>Твердое знание физики и математики*/}
        {/*    </Typography>*/}
        {/*</Box>*/}
    </SimplePage>);
}

export default function Profile({account}) {
    const Page = account.account === undefined ? Authorization : ProfileDetails;
    return (<Page account={account}/>);
}
