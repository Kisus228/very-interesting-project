import classes from './Auth.less';
import React from 'react';
import Button from "../Common/FormControl/Button";
import {Form, Formik} from "formik";
import {Input, PassInput} from "./AuthInput";
import {Link, useOutletContext} from "react-router-dom";
import {validateLogin} from "./Validate";
import {LoginType} from "../../types/types";

type Context = { loginError: string, postAuthLoginTC: (data: LoginType) => void }

const Login = () => {
    const {postAuthLoginTC, loginError} = useOutletContext<Context>();

    const initialValues = {
        username: "",
        password: ""
    }

    const onSubmit = (values: LoginType) => {
        postAuthLoginTC(values);
    }

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit}
                validate={values => validateLogin(values)}>
            <Form className={classes.FormWrapper}>
                <div className={classes.FormWrapperHeader}>
                    <h1>Login</h1>
                </div>
                <Input name={"username"} label={"Username"} type={"text"}/>
                <PassInput name={"password"} label={"Password"}/>
                <a href={"https://www.youtube.com/watch?v=dQw4w9WgXcQ"} target={"_blank"}>
                    Forgot Password?
                </a>
                <Button type={"submit"}>Sign in</Button>
                {!!loginError && <div className={classes.ErrorMessage}>{loginError}</div>}
                <div className={classes.RegisterArea}>
                    <span>
                        Don’t have an account yet?
                    </span>
                    <Link to={"/register"}>
                        Register for free
                    </Link>
                </div>
            </Form>
        </Formik>
    );
};

export default Login;