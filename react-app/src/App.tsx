import classes from './App.less';
import React from 'react';
import Header from "./components/Header/Header";
import Navigation from "./components/Navigation/Navigation";
import { Routes, Route } from 'react-router-dom';
import Search from "./components/Search/Search";
import Liked from "./components/Liked/Liked";

function App() {
    return (
        <div className={classes.AppWrapper}>
            <Header/>
            <main className={classes.AppContentWrapper}>
                <Navigation/>
                <div className={classes.AppContentContainer}>
                    <Routes>
                        <Route path="/">
                            <Route index element={<Search />} />
                            <Route path="liked" element={<Liked />}/>
                        </Route>
                    </Routes>
                </div>
            </main>
        </div>
    );
}

export default App;
