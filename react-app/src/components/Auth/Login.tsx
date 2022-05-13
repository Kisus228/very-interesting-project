import classes from './Auth.less';
import React from 'react';
import Button from "../Common/FormControl/Button";
import {Form, Formik} from "formik";
import {Input, PassInput} from "./AuthInput";
import {Link} from "react-router-dom";
import {validateLogin} from "./Validate";
import {LoginType} from "../../types/types";

const Login: React.FC<Props> = (props) => {
    const initialValues = {
        username: "",
        password: ""
    }

    const onSubmit = (values: LoginType) => {
        props.postAuthLoginTC(values);
    }

    const onClickLink = () => {
        props.removeError();
        props.setLoginForm();
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
                {!!props.loginError && <div className={classes.ErrorMessage}>{props.loginError}</div>}
                <div className={classes.RegisterArea}>
                    <span>
                        Don’t have an account yet?
                    </span>
                    <Link to={""} onClick={onClickLink}>
                        Register for free
                    </Link>
                </div>
            </Form>
        </Formik>
    );
};

interface Props {
    loginError: string,
    postAuthLoginTC: (data: LoginType) => void,
    setLoginForm: () => void,
    removeError: () => void,
}

export default Login;