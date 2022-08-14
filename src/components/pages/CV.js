import {useContext, useEffect, useState} from "react";
import {
    Alert,
    Box, Button,
    Stack,
    TextField,
} from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from "@mui/icons-material/Save";
import SimplePage from "../SimplePage";
import FormLine from "../FormLine";
import AccountContext from "../../service/accounts";
import {API_PATH} from "../../config";

const parseNumberOrUndefined = (text) => {
    try {
        return Number.parseInt(text);
    } catch (e) {
    }
}
const CVForm = ({data, updateField}) => {
    return (<>
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
        <FormLine><TextField
            required
            label="Дата рождения"
            defaultValue={data.date_of_birth}
            onChange={updateField("date_of_birth")}
            fullWidth
        /></FormLine>
        <FormLine><TextField
            required
            label="Адрес"
            defaultValue={data.address}
            onChange={updateField("address")}
            fullWidth
        /></FormLine>
        <FormLine><TextField
            required
            label="Контактные данные"
            defaultValue={data.contact_data}
            onChange={updateField("contact_data")}
            fullWidth
        /></FormLine>
        <FormLine><TextField
            required
            label="Название школы"
            defaultValue={data.school_name ?? ""}
            onChange={updateField("school_name")}
            fullWidth
        /></FormLine>
        <FormLine><TextField
            required
            label="Год начала обучения в школе"
            type="number"
            InputLabelProps={{
                shrink: true,
            }}
            defaultValue={data.school_begin_year ?? ""}
            onChange={updateField("school_begin_year", parseNumberOrUndefined)}
            fullWidth
        /></FormLine>
        <FormLine><TextField
            required
            label="Год окончания обучения в школе"
            type="number"
            InputLabelProps={{
                shrink: true,
            }}
            defaultValue={data.school_end_year ?? ""}
            onChange={updateField("school_end_year", parseNumberOrUndefined)}
            fullWidth
        /></FormLine>
        <FormLine><TextField
            required
            label="Университет или профессианальное учебное заведение"
            defaultValue={data.university_name ?? ""}
            onChange={updateField("university_name")}
            fullWidth
        /></FormLine>
        <FormLine>
            <TextField
                required
                label="Образовательная программа"
                defaultValue={data.university_study_program ?? ""}
                onChange={updateField("university_study_program")}
                fullWidth
            />
        </FormLine>
        <FormLine><TextField
            required
            label="Год начала обучения"
            type="number"
            InputLabelProps={{
                shrink: true,
            }}
            defaultValue={data.university_begin_year ?? ""}
            onChange={updateField("university_begin_year", parseNumberOrUndefined)}
            fullWidth
        /></FormLine>
        <FormLine><TextField
            required
            label="Год окончания обучения"
            type="number"
            InputLabelProps={{
                shrink: true,
            }}
            defaultValue={data.university_end_year ?? ""}
            onChange={updateField("university_end_year", parseNumberOrUndefined)}
            fullWidth
        /></FormLine>
        <FormLine><TextField
            required
            label="Навыки"
            multiline
            rows={4}
            defaultValue={data.skills ?? ""}
            onChange={updateField("skills")}
            fullWidth
        /></FormLine>
    </>);
}

export default function CV() {
    const {account, getCV, updateCV} = useContext(AccountContext);
    const [data, setData] = useState();
    const [existsUnsaved, setExistsUnsaved] = useState(false);
    const [saveProcess, setSaveProcess] = useState(undefined);

    useEffect(() => {
        if (account !== undefined) {
            getCV().then(setData);
        }
    }, [getCV, account, setData]);
    const updateField = (fieldName, format = x => x) =>
        (e) => {
            setExistsUnsaved(true);
            setData(d => ({...d, [fieldName]: format(e.target.value)}));
        }
    const save = () => {
        setSaveProcess("loading");
        updateCV(data).then(r => {
            if (r) {
                setSaveProcess(undefined);
                setExistsUnsaved(false);
            } else {
                setSaveProcess("fail");
            }
        });
    }
    return (<SimplePage title="Составить резюме">
        {data !== undefined && <CVForm data={data} updateField={updateField}/>}

        {data !== undefined && saveProcess === "fail" &&
            <Alert severity="error">Не удалось сохранить изменения резюме!</Alert>}
        {data !== undefined && <Box sx={{mt: 1, mb: 2}}>
            <Stack direction="row" spacing={2}>
                <LoadingButton
                    variant="contained"
                    endIcon={<SaveIcon/>}
                    loading={saveProcess === "loading"}
                    loadingPosition="end"
                    onClick={save}>Сохранить</LoadingButton>
                <Button variant="contained" disabled={existsUnsaved === true}
                        href={API_PATH + "users/" + account.login + "/cv/document.rtf"}
                        target={"#blank"}>
                    Скачать
                </Button>
            </Stack>
        </Box>}


    </SimplePage>);
}
