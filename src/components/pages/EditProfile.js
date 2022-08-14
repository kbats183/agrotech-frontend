import {useState} from "react";
import {
    Alert,
    Box,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    TextField,
} from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from "@mui/icons-material/Save";
import SimplePage from "../SimplePage";
import FormLine from "../FormLine";

const fixSchoolClass = (data) => {
    const newData = {...data};
    if (data.step === 1 && data.school_class < 8) {
        newData.school_class = undefined;
    }
    if (data.step === 2) {
        newData.school_class = undefined;
    }
    return newData;
}

export default function EditProfile({account}) {
    const [data, setData] = useState(account.account);
    const [saveProcess, setSaveProcess] = useState(undefined);

    const updateField = (fieldName, format = x => x) =>
        (e) => setData(d => ({...d, [fieldName]: format(e.target.value)}));
    const save = () => {
        setSaveProcess("loading");
        account.updateProfile(fixSchoolClass(data))
            .then(r => r ? setSaveProcess(undefined) : setSaveProcess("fail"))
    }

    return (<SimplePage title="Изменить профиль">
        <FormLine><TextField
            required
            label="Фамилия"
            defaultValue={data.last_name}
            onChange={updateField("last_name")}
            fullWidth
        /></FormLine>
        <FormLine><TextField
            required
            label="Имя"
            defaultValue={data.first_name}
            onChange={updateField("first_name")}
            fullWidth
        /></FormLine>
        <FormLine><TextField
            required
            label="Отчество"
            defaultValue={data.patronymic}
            onChange={updateField("patronymic")}
            fullWidth
        /></FormLine>

        <FormLine>
            <FormControl>
                <RadioGroup row value={data.step} onChange={e => {
                    updateField("step", Number.parseInt)(e);
                }}>
                    <FormControlLabel value={0} control={<Radio/>} label="Школьник"/>
                    <FormControlLabel value={1} control={<Radio/>} label="Выпускник школы"/>
                    <FormControlLabel value={2} control={<Radio/>} label="Студент"/>
                </RadioGroup>
            </FormControl>
        </FormLine>

        {(data.step === 0 || data.step === 1) && <FormLine>
            <FormControl fullWidth>
                <InputLabel id="school-class-select-label">Класс в школе</InputLabel>
                <Select
                    labelId="school-class-select-label"
                    id="school-class-select"
                    value={data.school_class ?? 9}
                    label="Класс в школе"
                    onChange={updateField("school_class")}
                >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
                        .filter(n => data.step === 0 || n > 8)
                        .map(n => <MenuItem value={n} key={n}>{n}</MenuItem>)}
                </Select>
            </FormControl>
        </FormLine>}

        {data.step !== undefined && <FormLine>
            <TextField
                label="Название школы"
                defaultValue={data.school_name ?? ""}
                onChange={updateField("school_name")}
                fullWidth
            />
        </FormLine>}

        {saveProcess === "fail" && <Alert severity="error">Не удалось сохранить изменения профиля!</Alert>}
        <Box sx={{mt: 1, mb: 2}}>
            <LoadingButton
                variant="contained"
                endIcon={<SaveIcon/>}
                loading={saveProcess === "loading"}
                loadingPosition="end"
                onClick={save}>Сохранить</LoadingButton>
        </Box>

    </SimplePage>);
}
