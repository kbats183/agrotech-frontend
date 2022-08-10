import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Container, createTheme, ThemeProvider} from "@mui/material";
import {themeOptions} from "./config";
import Profile from "./components/pages/Profile";
import EditProfile from "./components/pages/EditProfile"
import AppNav from "./AppNav";
import Professions from "./components/pages/Professions";
import Profession from "./components/pages/Profession";
import SkillsTest from "./components/pages/SkillsTest";
import Main from "./components/pages/Main";

function App() {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL ?? ""}>
            <ThemeProvider theme={createTheme(themeOptions)}>
                <div className="App">
                    <AppNav/>
                    <Container maxWidth="md" sx={{mt: 3}}>
                        <Routes>
                            <Route path="/" element={<Main/>}/>
                            <Route path="/profile/edit" element={<EditProfile/>}/>
                            <Route path="/profile" element={<Profile/>}/>
                            <Route path="/profession/:id" element={<Profession/>}/>
                            <Route path="/profession" element={<Professions/>}/>
                            <Route path="/skillsTest" element={<SkillsTest/>}/>
                        </Routes>
                    </Container>
                </div>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;
