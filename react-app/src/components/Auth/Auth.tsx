import React from 'react';
import classes from "./Auth.less";
import logo from "../../assets/logo.png";
import {ReactComponent as AuthImage} from "../../assets/AuthImage.svg";
import {Outlet} from "react-router-dom";

const Auth = () => {
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
                            <Outlet/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;