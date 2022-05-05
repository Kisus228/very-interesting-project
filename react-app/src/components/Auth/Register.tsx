import React, {useEffect} from 'react';
import classes from "./Auth.less";
import {Form, Formik} from "formik";
import {validateRegister} from "./Validate";
import {Input, PassInput} from "./AuthInput";
import Button from "../Common/FormControl/Button";
import {useLocation, useNavigate, useOutletContext} from "react-router-dom";
import {LoginType, RegisterType} from "../../types/types";
import {compose} from "redux";
import {connect} from "react-redux";
import {postAuthLoginTC} from "../../redux/AuthReducer";
import {AppStateType} from "../../redux/ReduxStore";

export interface RegisterTypeWithRetryPass extends RegisterType{
    retryPassword: string
}

const Register = () => {
    const {postAuthRegisterTC} = useOutletContext<{postAuthRegisterTC: (data: RegisterType) => void}>();
    const navigate = useNavigate();
    const initialValues = {
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        retryPassword: "",
    }

    const onSubmit = (values: RegisterTypeWithRetryPass) => {
        postAuthRegisterTC({
            username: values.username,
            firstname: values.firstname,
            lastname: values.lastname,
            email: values.email,
            password: values.password,
        });
    }

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit}
                validate={values => validateRegister(values)}>
            <Form className={classes.FormWrapper}>
                <h1>Register</h1>
                <Input name={"username"} label={"Username"} type={"text"}/>
                <Input name={"firstname"} label={"Firstname"} type={"text"}/>
                <Input name={"lastname"} label={"Lastname"} type={"text"}/>
                <Input name={"email"} label={"Email"} type={"email"}/>
                <PassInput name={"password"} label={"Password"}/>
                <PassInput name={"retryPassword"} label={"Retry password"}/>
                <Button type={"submit"}>Sign up</Button>
            </Form>
        </Formik>
    );
};

export default Register;