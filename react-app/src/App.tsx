import classes from './App.less';
import React, {useEffect} from 'react';
import Header from "./components/Header/Header";
import Navigation from "./components/Navigation/Navigation";
import {Outlet, Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import Search from "./components/Search/Search";
import Liked from "./components/Liked/Liked";
import ProfileInfo from "./components/ProfileInfo/ProfileInfo";
import MyProfile from "./components/MyProfile/MyProfile";
import OpenedVacancies from "./components/Vacancies/OpenedVacancies";
import Vacancy from "./components/Vacancy/Vacancy";
import NewVacancy from "./components/NewVacancy/NewVacancy";
import Auth from "./components/Auth/Auth";
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
        if (!props.auth && !(location === '/auth')) {
            navigate('/auth', {state: location, replace: true});
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
                    <Route index element={<OpenedVacancies openedVacancies={true}/>}/>
                    <Route path="history" element={<OpenedVacancies openedVacancies={false}/>}/>
                    <Route path="new" element={<NewVacancy/>}/>
                    <Route path=":vacancyId" element={<Vacancy/>}/>
                    <Route path=":vacancyId/edit" element={<NewVacancy/>}/>
                </Route>
                <Route path="profile" element={<MyProfile/>}/>
            </Route>
            <Route path="auth" element={<Auth/>}/>
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
