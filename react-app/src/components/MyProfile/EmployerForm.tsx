import React from 'react';
import {Form, Formik} from "formik";
import classes from "./MyProfile.less";
import FormInput from "../Common/FormControl/FormInput";
import Button from "../Common/FormControl/Button";
import {FullEmployerDataType, FullWorkerDataType, UserdataType} from "../../types/types";
import {compose} from "redux";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/ReduxStore";
import {putFullUserDataTC} from "../../redux/AuthReducer";

type ValuesType = {
    firstName: string,
    secondName: string,
    middleName: string,
    email: string,
}

const EmployerForm: React.FC<Props> = (props) => {
    const initialValues: ValuesType = {
        firstName: props.info.name || "",
        secondName: props.info.lastName || "",
        middleName: props.info.patronymic || "",
        email: props.info.email || "",
    }

    const getDataForSubmit = (values: ValuesType): {userdata: UserdataType} => {
        return {
            userdata: {
                first_name: values.firstName,
                last_name: values.secondName,
                patronymic: values.middleName,
                email: values.email,
            }
        }
    }

    const onSubmit = (values: ValuesType) => {
        props.putFullUserDataTC(getDataForSubmit(values));
        props.setEditForm(false);
    }

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            <Form className={classes.EmployerFormWrapper}>
                <section className={classes.FormSection}>
                    <FormInput label={"Имя"} type="text" name="firstName"
                               placeholder={"Имя"} required/>
                    <FormInput label={"Фамилия"} type="text" name="secondName"
                               placeholder={"Фамилия"} required/>
                    <FormInput label={"Отчество"} type="text" name="middleName"
                               placeholder={"Отчество"} required/>
                    <FormInput label={"Почта"} type="email" name="email"
                               placeholder={"Почта"} required/>
                    <div className={classes.ButtonWrapper}>
                        <div>
                            <Button type="button" onClick={() => props.setEditForm(false)} color="red">
                                Отменить
                            </Button>
                            <Button type="submit" color="green">
                                Сохранить
                            </Button>
                        </div>
                    </div>
                </section>
            </Form>
        </Formik>
    );
};

const mapStateToProps = () => {
    return {}
}

type MapStatePropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    putFullUserDataTC: (data: {userdata: UserdataType}) => void
}

type OwnProps = {
    info: FullEmployerDataType,
    setEditForm: (edit: boolean) => void
}

type Props = MapDispatchPropsType & OwnProps;

export default compose(connect<MapStatePropsType, MapDispatchPropsType, OwnProps, AppStateType>(mapStateToProps,{putFullUserDataTC}))(EmployerForm);
