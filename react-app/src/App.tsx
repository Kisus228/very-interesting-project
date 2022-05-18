import classes from './App.less';
import React, {useEffect, useRef, useState} from 'react';
import Header from "./components/Header/Header";
import Navigation from "./components/Navigation/Navigation";
import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import {AppStateType} from "./redux/ReduxStore";
import {compose} from "redux";
import {connect} from "react-redux";
import {initializeApp} from "./redux/AppReducer";
import WorkerRoutes from "./components/Worker/WorkerRoutes";
import EmployerRoutes from "./components/Employer/EmployerRoutes";

export const AppWrapper = () => {
    const ref = useRef<HTMLDivElement>(null)
    const location = useLocation().pathname;
    const [navbarToggle, setNavbarToggle] = useState(false);

    useEffect(() => {
        ref.current?.scrollTo(0, 0);
        setNavbarToggle(false);
    }, [location])

    return (
        <div className={classes.AppWrapper}>
            <Header onClickNavbarToggle={() => setNavbarToggle(!navbarToggle)}/>
            <main className={classes.AppContentWrapper}>
                <Navigation navbarToggle={navbarToggle}/>
                <div ref={ref} className={classes.AppContentContainer}>
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
        props.initializeApp()
    }, []);

    useEffect(() => {
        if (props.initialized && !props.auth && !(location === '/auth')) {
            navigate('/auth', {state: location, replace: true});
        }
        if (props.initialized && props.auth && location === '/') {
            navigate('/search', {replace: true});
        }
    }, [props.auth, props.initialized]);

    return props.initialized
        ? props.isWorker
            ? <WorkerRoutes/>
            : <EmployerRoutes/>
        : null;
}

const mapStateToProps = (state: AppStateType) => {
    return {
        auth: state.authData.auth,
        isWorker: state.authData.isWorker,
        initialized: state.appData.initialized
    }
}

type MapStatePropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    initializeApp: () => void,
}

type Props = MapStatePropsType & MapDispatchPropsType;

export default compose<React.ComponentType>(connect(mapStateToProps, {initializeApp}))(App);
