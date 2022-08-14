import {AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Stack, Toolbar, Typography} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import {useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import AccountContext from "./service/accounts";

const pages = [
    ["Профессии", "profession", 0],
    ["Профессии", "profession", 1],
    ["Профессии", "profession", undefined],
    ["Понравившиеся профессии", "profession/favourite", 0],
    ["Где учиться", "studyPrograms", 0],
    ["Тест способностей", "chooseProfession", 1],
    ["Университеты", "university", 1],
    ["Университеты", "university", undefined],
    ["Вакансии", "vacancies", 2],
    ["Составить резюме", "cv", 2],
    ["Профиль", "profile", true],
];

export default function AppNav() {
    const {account} = useContext(AccountContext);
    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = useState(null);
    const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);

    const handleCloseNavMenu = () => setAnchorElNav(null);

    return (<AppBar position="static">
        <Container maxWidth="md">
            <Toolbar disableGutters>
                <Box sx={{flexGrow: 1, display: {xs: "flex", md: "none"}}}>
                    <IconButton size="large" aria-label="account of current user"
                                aria-controls="menu-appbar" aria-haspopup="true"
                                onClick={handleOpenNavMenu} color="inherit"><MenuIcon/></IconButton>
                    <Menu id="menu-appbar" anchorEl={anchorElNav}
                          anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "left",
                          }} keepMounted
                          transformOrigin={{
                              vertical: "top",
                              horizontal: "left",
                          }} open={Boolean(anchorElNav)}
                          onClose={handleCloseNavMenu}
                          sx={{display: {xs: "block", md: "none"}}}>
                        {pages
                            .filter(([, , step]) => step === true || account?.step === step)
                            .map(([name, url]) => (
                                <MenuItem key={url} onClick={() => {
                                    navigate(url);
                                    handleCloseNavMenu();
                                }}>
                                    <Typography textAlign="center">{name}</Typography>
                                </MenuItem>
                            ))}
                    </Menu>
                </Box>
                <Typography variant="h6" noWrap component="div" onClick={() => navigate("/")}
                            sx={{flexGrow: 1, display: {xs: "flex", md: "none"}}}>
                    Я в Агратехе
                </Typography>

                <Box sx={{mr: 2, display: {xs: "none", md: "flex"}}}>
                    <Typography variant="h5" noWrap onClick={() => navigate("/")}
                                sx={{mr: 2, display: {xs: "none", md: "flex"}}}>
                        Я в Агратехе
                    </Typography>
                </Box>
                <Box sx={{flexGrow: 1, display: {xs: "none", md: "flex"}}}>
                    {pages.slice(0, -1)
                        .filter(([, , step]) => step === true || account?.step === step)
                        .map(([name, url]) =>
                            <Button key={url} onClick={() => navigate(url)}
                                    sx={{my: 2, color: "white", display: "block"}}>
                                {name}
                            </Button>)}
                </Box>
                <Box sx={{flexGrow: 0, display: {xs: "none", md: "flex"}}}>
                    <Stack direction="row" spacing={2}>
                        {pages.slice(-1).map(([name, url]) =>
                            (<Button key={url} onClick={() => navigate(url)}
                                     sx={{my: 2, color: "white", display: "block"}}>
                                {name} <PersonIcon sx={{mb: -0.75, ml: 0.5}}/>
                            </Button>))}
                    </Stack>
                </Box>
            </Toolbar>
        </Container>
    </AppBar>)
}
