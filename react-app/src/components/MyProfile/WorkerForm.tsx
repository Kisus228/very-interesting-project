import React, {useEffect} from 'react';
import {Form, Formik} from "formik";
import classes from "./MyProfile.less";
import FormInput from "../Common/FormControl/FormInput";
import {FormTextarea} from "../Common/FormControl/FormTextarea";
import Button from "../Common/FormControl/Button";
import {FullWorkerDataType} from "../../types/types";
import {FormSelect} from "../Common/FormControl/FormSelect";
import {AppStateType} from "../../redux/ReduxStore";
import {compose} from "redux";
import {connect} from "react-redux";
import {getFilterTC} from "../../redux/FilterReducer";

type ValuesType = {
    firstName: string,
    secondName: string,
    middleName: string,
    email: string,
    birthday: string,
    specialization: string,
    experience: string,
    skills: number[],
    resume: string,
    aboutMe: string,
    vk: string,
    tg: string,
    github: string,
    gitlab: string,
}

const WorkerForm: React.FC<Props> = (props) => {
    useEffect(() => {
        props.getFilterTC();
    }, [])

    if (!props.skills.length) return null;

    const getDate = (date?: Date | null) => {
        if (!date) return undefined;
        const result = date.toLocaleDateString().split('.');
        return result[2] + "-" + result[1] + "-" + result[0];
    }

    const initialValues: ValuesType = {
        firstName: props.info.name || "",
        secondName: props.info.lastName || "",
        middleName: props.info.patronymic || "",
        email: props.info.email || "",
        birthday: getDate(props.info.birthDay) || "",
        specialization: props.info.specialization || "",
        experience: String(props.info.experience) || "",
        skills: props.info.skills.map(skill => skill.id) || [],
        resume: props.info.resume || "",
        aboutMe: props.info.aboutMe || "",
        vk: props.info.vk || "",
        tg: props.info.tg || "",
        github: props.info.github || "",
        gitlab: props.info.gitlab || "",
    }

    const getDataForSubmit = (values: ValuesType) => {
        return {
            firstName: values.firstName,
            secondName: values.secondName,
            middleName: values.middleName,
            email: values.email,
            birthday: values.birthday,
            specialization: values.specialization,
            experience: Number(values.experience),
            skills: values.skills,
            resume_text: values.resume,
            about_me: values.aboutMe,
            vk: values.vk,
            tg: values.tg,
            github: values.github,
            gitlab: values.gitlab,
        }
    }

    const onSubmit = (values: ValuesType) => {
        props.onSubmit(getDataForSubmit(values));
    }

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            <Form className={classes.WorkerFormWrapper}>
                <section className={classes.FormSection}>
                    <FormInput label={"Имя"} type="text" name="firstName"
                               placeholder={"Имя"} required/>
                    <FormInput label={"Фамилия"} type="text" name="secondName"
                               placeholder={"Фамилия"} required/>
                    <FormInput label={"Отчество"} type="text" name="middleName"
                               placeholder={"Отчество"} required/>
                    <FormInput label={"Почта"} type="email" name="email"
                               placeholder={"Почта"} required/>
                    <FormInput label={"Дата рождения"} type="date" name="birthday"
                               placeholder={"Дата рождения"} required/>
                    <FormInput label={"Специальность"} type="text" name="specialization"
                               placeholder={"Специальность"} required/>
                    <FormInput label={"Стаж"} type="number" name="experience"
                               placeholder={"Стаж"} required/>
                </section>
                <section className={classes.FormSection}>
                    <FormInput label={"VK"} type="text" name="vk"
                               placeholder={"VK"}/>
                    <FormInput label={"Telegram"} type="text" name="tg"
                               placeholder={"Telegram"}/>
                    <FormInput label={"Github"} type="text" name="github"
                               placeholder={"Github"}/>
                    <FormInput label={"Gitlab"} type="text" name="gitlab"
                               placeholder={"Gitlab"}/>
                    <FormSelect label={"Навыки"} name="gitlab" defaultValue={initialValues.skills}
                                options={props.skills} placeholder={"Навыки"} isMulti/>
                    <FormTextarea label={"Резюме"} name="resume"
                                  placeholder={"Резюме"} required/>
                    <FormTextarea label={"О себе"} name="aboutMe"
                                  placeholder={"О себе"} required/>
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

const mapStateToProps = (state: AppStateType) => {
    return {
        skills: state.filterData.skills,
    }
}

type MapStatePropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    getFilterTC: () => void
}

type OwnProps = {
    info: FullWorkerDataType,
    onSubmit: (data: any) => void,
    setEditForm: (edit: boolean) => void
}

type Props = MapStatePropsType & MapDispatchPropsType & OwnProps;

export default compose(connect<MapStatePropsType, MapDispatchPropsType, OwnProps, AppStateType>(mapStateToProps, {getFilterTC}))(WorkerForm);
