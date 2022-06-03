import React, {useEffect, useState} from 'react';
import classes from "./Auth.less";
import logo from "../../assets/logo.png";
import {ReactComponent as AuthImage} from "../../assets/AuthImage.svg";
import {useLocation, useNavigate} from "react-router-dom";
import {AppStateType} from "../../redux/ReduxStore";
import {LoginType, RegisterType} from "../../types/types";
import {compose} from "redux";
import {connect} from "react-redux";
import {postAuthLoginTC, postAuthRegisterTC, removeError} from "../../redux/AuthReducer";
import Login from "./Login";
import Register from "./Register";

const Auth: React.FC<Props> = (props) => {
    const navigate = useNavigate();
    const location = useLocation().state as string;
    const prevLocation = (location === "/" || location === null) ? "/search" : location;
    const [loginForm, setLoginForm] = useState(true);

    useEffect(() => {
        if (props.auth) {
            navigate(prevLocation, {replace: true});
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
                                {
                                    loginForm && <Login loginError={props.loginError}
                                                        setLoginForm={() => setLoginForm(false)}
                                                        postAuthLoginTC={props.postAuthLoginTC}
                                                        removeError={props.removeError}/>
                                }
                                {
                                    !loginForm && <Register setLoginForm={() => setLoginForm(true)}
                                                            registerError={props.registerError}
                                                            postAuthRegisterTC={props.postAuthRegisterTC}
                                                            removeError={props.removeError}/>
                                }
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
    removeError: () => void
}

type Props = MapStatePropsType & MapDispatchPropsType;

export default compose<React.ComponentType>(connect(mapStateToProps, {
    postAuthLoginTC,
    postAuthRegisterTC,
    removeError
}))(Auth);