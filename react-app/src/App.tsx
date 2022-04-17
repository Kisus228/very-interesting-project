import classes from './App.less';
import React from 'react';
import Header from "./components/Header/Header";
import Navigation from "./components/Navigation/Navigation";
import {Routes, Route} from 'react-router-dom';
import Search from "./components/Search/Search";
import Liked from "./components/Liked/Liked";
import ProfileInfo from "./components/ProfileInfo/ProfileInfo";
import MyProfile from "./components/MyProfile/MyProfile";
import Vacancies from "./components/Vacancies/Vacancies";
import OpenedVacancies from "./components/Vacancies/OpenedVacancies";
import HistoryVacancies from "./components/Vacancies/HistoryVacancies";

function App() {
    return (
        <div className={classes.AppWrapper}>
            <Header/>
            <main className={classes.AppContentWrapper}>
                <Navigation/>
                <div className={classes.AppContentContainer}>
                    <Routes>
                        <Route path="/">
                            <Route path="search">
                                <Route path=":profileId" element={<ProfileInfo/>}/>
                                <Route index element={<Search/>}/>
                            </Route>
                            <Route path="liked" element={<Liked/>}/>
                            <Route path="vacancies" element={<Vacancies/>}>
                                <Route index element={<OpenedVacancies/>} />
                                <Route path="history" element={<HistoryVacancies/>} />
                            </Route>
                            <Route path="profile" element={<MyProfile/>}/>
                        </Route>
                    </Routes>
                </div>
            </main>
        </div>
    );
}

export default App;
