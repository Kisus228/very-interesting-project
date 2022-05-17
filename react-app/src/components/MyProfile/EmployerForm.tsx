import React from 'react';
import {Form, Formik} from "formik";
import classes from "./MyProfile.less";
import FormInput from "../Common/FormControl/FormInput";
import Button from "../Common/FormControl/Button";

interface Props {
    info: {
        firstName: string,
        secondName: string,
        middleName: string,
        email: string,
    },
    onSubmit: (data: any) => void,
    setEditForm: (edit: boolean) => void
}

type ValuesType = {
    firstName: string,
    secondName: string,
    middleName: string,
    email: string,
}

const EmployerForm: React.FC<Props> = (props) => {
    const initialValues: ValuesType = {
        firstName: props.info.firstName || "",
        secondName: props.info.secondName || "",
        middleName: props.info.middleName || "",
        email: props.info.email || "",
    }

    const getDataForSubmit = (values: ValuesType) => {
        return {
            firstName: values.firstName,
            secondName: values.secondName,
            middleName: values.middleName,
            email: values.email,
        }
    }

    const onSubmit = (values: ValuesType) => {
        props.onSubmit(getDataForSubmit(values));
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

export default EmployerForm;