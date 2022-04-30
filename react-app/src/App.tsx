import classes from './App.less';
import React, {useEffect, useState} from 'react';
import Header from "./components/Header/Header";
import Navigation from "./components/Navigation/Navigation";
import {Routes, Route, Outlet, useNavigate, useLocation} from 'react-router-dom';
import Search from "./components/Search/Search";
import Liked from "./components/Liked/Liked";
import ProfileInfo from "./components/ProfileInfo/ProfileInfo";
import MyProfile from "./components/MyProfile/MyProfile";
import OpenedVacancies from "./components/Vacancies/OpenedVacancies";
import HistoryVacancies from "./components/Vacancies/HistoryVacancies";
import Vacancy from "./components/Vacancy/Vacancy";
import NewVacancy from "./components/NewVacancy/NewVacancy";
import Login from "./components/Auth/Login";
import Auth from "./components/Auth/Auth";
import Register from "./components/Auth/Register";

const AppWrapper = (props: {setAuth: (t: boolean) => void}) => {
    return (
        <div className={classes.AppWrapper}>
            <Header setAuth={props.setAuth}/>
            <main className={classes.AppContentWrapper}>
                <Navigation/>
                <div className={classes.AppContentContainer}>
                    <Outlet/>
                </div>
            </main>
        </div>
    );
}

function App() {
    const navigate = useNavigate();
    const location = useLocation().pathname;

    const [isAuth, setAuth] = useState(false);

    useEffect(() => {
        if (!isAuth && !(location === '/auth' || location === '/register')) {
            navigate('/auth', {state: location});
            setAuth(true);
        }
    }, [isAuth]);

    return (
        <Routes>
            <Route path="/" element={<AppWrapper setAuth={setAuth}/>}>
                <Route path="search">
                    <Route path=":profileId" element={<ProfileInfo/>}/>
                    <Route index element={<Search/>}/>
                </Route>
                <Route path="liked" element={<Liked/>}/>
                <Route path="vacancies">
                    <Route index element={<OpenedVacancies/>}/>
                    <Route path="history" element={<HistoryVacancies/>}/>
                    <Route path="new" element={<NewVacancy/>}/>
                    <Route path=":vacancyId" element={<Vacancy/>}/>
                </Route>
                <Route path="profile" element={<MyProfile/>}/>
            </Route>
            <Route element={<Auth/>}>
                <Route path="auth" element={<Login/>}/>
                <Route path="register" element={<Register/>}/>
            </Route>
        </Routes>
    );
}

export default App;
