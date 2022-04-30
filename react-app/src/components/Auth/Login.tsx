import classes from './Auth.less';
import React from 'react';
import Button from "../Common/FormControl/Button";
import {Formik, Form} from "formik";
import {LoginInput, PassInput} from "./AuthInput";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {validateLogin} from "./Validate";

export interface LoginType {
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
    const prevLocation = (location === "/" || location === null) ? "/search" : location;

    const onSubmit = (values: LoginType) => {
        console.log(values);
        navigate(prevLocation);
    }

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit}
                validate={values => validateLogin(values)}>
            <Form className={classes.FormWrapper}>
                <h1>Login</h1>
                <LoginInput name={"email"} label={"Email"}/>
                <PassInput name={"password"} label={"Password"}/>
                <a href={"https://www.youtube.com/watch?v=dQw4w9WgXcQ"} target={"_blank"}>
                    Forgot Password?
                </a>
                <Button type={"submit"}>Sign in</Button>
                <div className={classes.RegisterArea}>
                    <span>
                        Don’t have an account yet?
                    </span>
                    <Link to={"/register"} state={prevLocation}>
                        Register for free
                    </Link>
                </div>
            </Form>
        </Formik>
    );
};

export default Login;