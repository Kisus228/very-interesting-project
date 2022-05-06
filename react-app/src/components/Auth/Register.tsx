import React from 'react';
import classes from "./Auth.less";
import {Form, Formik} from "formik";
import {validateRegister} from "./Validate";
import {Input, PassInput} from "./AuthInput";
import Button from "../Common/FormControl/Button";
import {Link, useNavigate, useOutletContext} from "react-router-dom";
import {LoginType, RegisterType} from "../../types/types";
import {Back} from "../Common/Icons/Icons";

export interface RegisterTypeWithRetryPass extends RegisterType {
    retryPassword: string
}

const Register: React.FC<Props> = (props) => {
    const initialValues = {
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        retryPassword: "",
    }

    const onSubmit = (values: RegisterTypeWithRetryPass) => {
        props.postAuthRegisterTC({
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
                <div className={classes.FormWrapperHeader}>
                    <div onClick={props.setLoginForm} className={classes.BackButton}>
                        <Back/>
                    </div>
                    <h1>Register</h1>
                </div>
                <Input name={"username"} label={"Username"} type={"text"}/>
                <Input name={"firstname"} label={"Firstname"} type={"text"}/>
                <Input name={"lastname"} label={"Lastname"} type={"text"}/>
                <Input name={"email"} label={"Email"} type={"email"}/>
                <PassInput name={"password"} label={"Password"}/>
                <PassInput name={"retryPassword"} label={"Retry password"}/>
                <Button type={"submit"}>Sign up</Button>
                {
                    !!props.registerError && props.registerError.map(([k, v]) =>
                        <div className={classes.ErrorMessage} key={k}>{v}</div>)
                }
            </Form>
        </Formik>
    );
};

interface Props {
    registerError: [string, string][],
    postAuthRegisterTC: (data: RegisterType) => void,
    setLoginForm: () => void
}

export default Register;