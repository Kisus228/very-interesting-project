import React from 'react';
import classes from "./Auth.less";
import logo from "../../assets/logo.png";
import {ReactComponent as AuthImage} from "../../assets/AuthImage.svg";
import {Form, Formik} from "formik";
import {validateRegister} from "./Validate";
import {LoginInput, PassInput} from "./AuthInput";
import Button from "../Common/FormControl/Button";
import {LoginType} from "./Login";
import {useLocation, useNavigate} from "react-router-dom";

export interface RegisterType extends LoginType{
    retryPassword: string
}

const Register = () => {
    const initialValues = {
        email: "",
        password: "",
        retryPassword: ""
    }
    const navigate = useNavigate();
    const location = useLocation().state as string;
    const prevLocation = (location === "/" || location === null) ? "/search" : location;

    const onSubmit = (values: RegisterType) => {
        console.log(values);
        navigate(prevLocation);
    }

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit}
                validate={values => validateRegister(values)}>
            <Form className={classes.FormWrapper}>
                <h1>Register</h1>
                <LoginInput name={"email"} label={"Email"}/>
                <PassInput name={"password"} label={"Password"}/>
                <PassInput name={"retryPassword"} label={"Retry password"}/>
                <Button type={"submit"}>Sign up</Button>
            </Form>
        </Formik>
    );
};

export default Register;