import classes from './Auth.less';
import React, {useEffect} from 'react';
import Button from "../Common/FormControl/Button";
import {Formik, Form} from "formik";
import {Input, PassInput} from "./AuthInput";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {validateLogin} from "./Validate";
import {AppStateType} from "../../redux/ReduxStore";
import {compose} from "redux";
import {connect} from "react-redux";
import {postAuthLoginTC} from "../../redux/AuthReducer";

export interface LoginType {
    username: string;
    password: string;
}

const Login: React.FC<Props> = (props) => {
    const initialValues = {
        username: "",
        password: ""
    }
    const navigate = useNavigate();
    const location = useLocation().state as string;
    const prevLocation = (location === "/" || location === null) ? "/search" : location;

    const onSubmit = (values: LoginType) => {
        props.postAuthLoginTC(values);
    }

    useEffect(() => {
        if (props.auth) {
            navigate(prevLocation);
        }
    }, [props.auth])

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
                    <Link to={"/register"} state={prevLocation}>
                        Register for free
                    </Link>
                </div>
            </Form>
        </Formik>
    );
};

const mapStateToProps = (state: AppStateType) => {
    return {
        auth: state.authData.auth,
    }
}

type MapStatePropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    postAuthLoginTC: (data: LoginType) => void
}

type Props = MapStatePropsType & MapDispatchPropsType;

export default compose<React.ComponentType>(connect(mapStateToProps, {postAuthLoginTC}))(Login);