import classes from './Auth.less';
import React, {useEffect} from 'react';
import Button from "../Common/FormControl/Button";
import {Formik, Form} from "formik";
import {Input, PassInput} from "./AuthInput";
import {Link, useLocation, useNavigate, useOutletContext} from "react-router-dom";
import {validateLogin} from "./Validate";
import {AppStateType} from "../../redux/ReduxStore";
import {compose} from "redux";
import {connect} from "react-redux";
import {postAuthLoginTC} from "../../redux/AuthReducer";
import {LoginType} from "../../types/types";

const Login = () => {
    const {postAuthLoginTC} = useOutletContext<{postAuthLoginTC: (data: LoginType) => void}>();

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
                <h1>Login</h1>
                <Input name={"username"} label={"Username"} type={"text"}/>
                <PassInput name={"password"} label={"Password"}/>
                <a href={"https://www.youtube.com/watch?v=dQw4w9WgXcQ"} target={"_blank"}>
                    Forgot Password?
                </a>
                <Button type={"submit"}>Sign in</Button>
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