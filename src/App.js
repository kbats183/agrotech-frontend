import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import {Container, createTheme, ThemeProvider} from "@mui/material";
import {themeOptions} from "./config";
import Profile from "./components/pages/Profile";
import EditProfile from "./components/pages/EditProfile"
import AppNav from "./AppNav";
import Professions from "./components/pages/Professions";
import Profession from "./components/pages/Profession";
import SkillsTest from "./components/pages/SkillsTest";
import Main from "./components/pages/Main";
import {useAccount, AccountProvider} from "./service/accounts";

function App() {
    const account = useAccount();
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
                                       element={account.account ? <EditProfile account={account}/> :
                                           <Navigate to={"/profile"}/>}/>
                                <Route path="/profession/:id" element={<Profession/>}/>
                                <Route path="/profession" element={<Professions/>}/>
                                <Route path="/skillsTest" element={<SkillsTest/>}/>
                            </Routes>
                        </Container>
                    </div>
                </AccountProvider>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;
