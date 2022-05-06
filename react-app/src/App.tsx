import classes from './App.less';
import React, {useEffect} from 'react';
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
import {AppStateType} from "./redux/ReduxStore";
import {compose} from "redux";
import {connect} from "react-redux";

const AppWrapper = () => {
    return (
        <div className={classes.AppWrapper}>
            <Header/>
            <main className={classes.AppContentWrapper}>
                <Navigation/>
                <div className={classes.AppContentContainer}>
                    <Outlet/>
                </div>
            </main>
        </div>
    );
}

const App: React.FC<Props> = (props) => {
    const navigate = useNavigate();
    const location = useLocation().pathname;

    useEffect(() => {
        if (!props.auth && !(location === '/auth' || location === '/register')) {
            navigate('/auth', {state: location});
        }
        if (props.auth && (location === '/auth' || location === '/register')) {
            navigate('/search');
        }
    }, [props.auth]);

    return (
        <Routes>
            <Route path="/" element={<AppWrapper/>}>
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
                    <Route path=":vacancyId/edit" element={<NewVacancy/>}/>
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

const mapStateToProps = (state: AppStateType) => {
    return {
        auth: state.authData.auth,
    }
}

type MapStatePropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {}

type Props = MapStatePropsType & MapDispatchPropsType;

export default compose<React.ComponentType>(connect(mapStateToProps, {}))(App);
