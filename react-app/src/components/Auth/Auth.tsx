import React, {useEffect} from 'react';
import classes from "./Auth.less";
import logo from "../../assets/logo.png";
import {ReactComponent as AuthImage} from "../../assets/AuthImage.svg";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {AppStateType} from "../../redux/ReduxStore";
import {LoginType, RegisterType} from "../../types/types";
import {compose} from "redux";
import {connect} from "react-redux";
import {postAuthLoginTC, postAuthRegisterTC} from "../../redux/AuthReducer";

const Auth: React.FC<Props> = (props) => {
    const navigate = useNavigate();
    const location = useLocation().state as string;
    const prevLocation = (location === "/" || location === null) ? "/search" : location;

    useEffect(() => {
        if (props.auth) {
            navigate(prevLocation);
        }
    }, [props.auth])

    return (
        <div className={classes.AuthWrapper}>
            <header className={classes.Header}>
                <div className={classes.Logo}>
                    <img width={110} height={28} src={logo} alt={"logo"}/>
                </div>
            </header>
            <div className={classes.AuthContentWrapper}>
                <div className={classes.AuthContentContainer}>
                    <div className={classes.Content}>
                        <div className={classes.AuthImage}>
                            <AuthImage/>
                        </div>
                        <div className={classes.AuthContainer}>
                            <div className={classes.AuthContent}>
                                <Outlet context={{
                                    postAuthLoginTC: props.postAuthLoginTC,
                                    postAuthRegisterTC: props.postAuthRegisterTC,
                                    loginError: props.loginError,
                                    registerError: props.registerError
                                }}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
const mapStateToProps = (state: AppStateType) => {
    return {
        auth: state.authData.auth,
        loginError: state.authData.loginError,
        registerError: state.authData.registerError,
    }
}

type MapStatePropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    postAuthLoginTC: (data: LoginType) => void
    postAuthRegisterTC: (data: RegisterType) => void
}

type Props = MapStatePropsType & MapDispatchPropsType;

export default compose<React.ComponentType>(connect(mapStateToProps, {postAuthLoginTC, postAuthRegisterTC}))(Auth);