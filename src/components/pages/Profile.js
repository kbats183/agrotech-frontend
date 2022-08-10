import {Box, Button, Divider, Typography} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import {useNavigate} from "react-router-dom";
import SimplePage from "../SimplePage";

export default function Profile() {
    const navigate = useNavigate();

    return (<SimplePage title="Мой профиль">
        <Typography variant="h4">Петров Николай Иванович</Typography>

        <Typography variant="h6">Школьник, 9 класс</Typography>

        <Box sx={{mt: 1, mb: 2}}>
            <Button variant="contained" endIcon={<EditIcon/>}
                    onClick={() => navigate("/profile/edit")}>Изменить</Button>
        </Box>

        <Divider sx={{my: 1}}/>

        <Box>
            <Typography variant="h6">Увлечения</Typography>
            <Typography>
                Одно, второе, третье и еще что-то.
            </Typography>
        </Box>

        <Divider sx={{my: 1}}/>

        <Box>
            <Typography variant="h6">Навыки</Typography>
            <Typography>Твердое знание физики и математики
            </Typography>
        </Box>
    </SimplePage>);
}
