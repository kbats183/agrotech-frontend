import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import {Box, Container, createTheme, ThemeProvider, Typography} from "@mui/material";
import {themeOptions} from "./config";
import Profile from "./components/pages/Profile";
import EditProfile from "./components/pages/EditProfile"
import AppNav from "./AppNav";
import Professions from "./components/pages/Professions";
import Profession from "./components/pages/Profession";
import SkillsTest from "./components/pages/SkillsTest";
import Main from "./components/pages/Main";
import {useAccount, AccountProvider} from "./service/accounts";
import ChooseProfession from "./components/pages/ChooseProfession";
import './App.css';

function App() {
    const account = useAccount();
    const redirectToLogin = <Navigate to={"/profile"}/>;
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL ?? ""}>
            <ThemeProvider theme={createTheme(themeOptions)}>
                <AccountProvider value={account}>
                    <div className="App">
                        <AppNav/>
                        <Container maxWidth="md" sx={{mt: 3}}>
                            <Routes>
                                <Route path="/" element={<Main/>}/>
                                <Route path="/profile" element={<Profile account={account}/>}/>
                                <Route path="/profile/edit"
                                       element={account.account ? <EditProfile account={account}/> : redirectToLogin}/>
                                <Route path="/profession/:id" element={<Profession/>}/>
                                <Route path="/profession" element={<Professions/>}/>
                                <Route path="/chooseProfession"
                                       element={account.account ? <ChooseProfession/> : redirectToLogin}/>
                                <Route path="/skillsTest" element={account.account ? <SkillsTest/> : redirectToLogin}/>
                            </Routes>
                        </Container>
                    </div>
                    <Box className="Footer">
                        <Container maxWidth="md" sx={{my: 8, color: "#fff"}}>
                            <Typography variant={"body1"} component={"p"}>
                                Я в Агратехе &middot; Выбери свою профессию в агротехнической отросли!
                            </Typography>
                        </Container>
                    </Box>
                </AccountProvider>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;
