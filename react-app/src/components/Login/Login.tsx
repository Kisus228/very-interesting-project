import classes from './Login.less';
import React from 'react';
import logo from "../../assets/logo.png";
import {ReactComponent as AuthImage} from "../../assets/AuthImage.svg";
import Button from "../Common/FormControl/Button";
import {Formik, Form} from "formik";
import {validate} from "./Validate";
import {LoginInput, PassInput} from "./AuthInput";
import {useLocation, useNavigate} from "react-router-dom";

export interface ValuesType {
    email: string;
    password: string;
}

const Login = () => {
    const initialValues = {
        email: "",
        password: ""
    }
    const navigate = useNavigate();
    const location = useLocation().state as string;
    const prevLocation = location === "/" ? "/search" : location;

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
                            <Formik initialValues={initialValues} onSubmit={(values) => console.log(values)}
                                    validate={values => validate(values)}>
                                <Form className={classes.FormWrapper}>
                                    <h1>Login</h1>
                                    <LoginInput name={"email"} label={"Email"}/>
                                    <PassInput name={"password"} label={"Password"}/>
                                    <a href={"https://www.youtube.com/watch?v=dQw4w9WgXcQ"} target={"_blank"}>
                                        Forgot Password?
                                    </a>
                                    <Button type={"submit"} onClick={() => navigate(prevLocation)}>Sign in</Button>
                                    <div className={classes.RegisterArea}>
                                <span>
                                    Don’t have an account yet?
                                </span>
                                        <a href={"https://www.youtube.com/watch?v=dQw4w9WgXcQ"} target={"_blank"}>
                                            Register for free
                                        </a>
                                    </div>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;