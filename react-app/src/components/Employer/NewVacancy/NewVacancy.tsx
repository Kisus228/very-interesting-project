import React, {useEffect, useState} from 'react';
import classes from './NewVacancy.less';
import Button from "../../Common/FormControl/Button";
import {Form, Formik} from "formik";
import {FormSelect} from "../../Common/FormControl/FormSelect";
import FormInput from "../../Common/FormControl/FormInput";
import {useNavigate, useParams} from "react-router-dom";
import {compose} from "redux";
import {connect} from "react-redux";
import {getFilterTC} from "../../../redux/FilterReducer"
import {AppStateType} from "../../../redux/ReduxStore";
import {VacancyExpendsType, VacancyType} from "../../../types/types";
import {getVacancyTC, postVacancyTC} from "../../../redux/VacansyReducer";
import {getDataForSubmit, getInitialValuesForEdit} from "./InitForm";
import VacancyForm from "./VacancyForm";

interface ValuesType {
    vacancyName: string,
    speciality: string,
    vacancyDescription: string,
    employmentType: string,
    schedule: string,
    conditions: string,
    skills: any,
    requirements: string,
    responsibilities: string,
    salary: string,
    count: string,
    additionally: string
}

const NewVacancy: React.FC<Props> = (props) => {
    useEffect(() => {
        props.getFilterTC();
    }, [])

    const initialValues: ValuesType = {
        vacancyName: "",
        speciality: "",
        vacancyDescription: "",
        employmentType: "",
        schedule: "",
        conditions: "",
        skills: [],
        requirements: "",
        responsibilities: "",
        salary: "",
        count: "",
        additionally: ""
    }

    const navigate = useNavigate();

    const onSubmit = (values: ValuesType) => {
        props.postVacancyTC(getDataForSubmit(values))
        navigate("/vacancies");
    }

    return <VacancyForm onSubmit={onSubmit} initialValues={initialValues} editForm={false} skills={props.skills}/>;
};

const mapStateToProps = (state: AppStateType) => {
    return {
        skills: state.filterData.skills,
        vacancy: state.vacancyData.vacancy
    }
}

type MapStatePropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    getFilterTC: () => void
    postVacancyTC: (data: VacancyExpendsType) => void
}

type Props = MapStatePropsType & MapDispatchPropsType;

export default compose<React.ComponentType>(connect(mapStateToProps, {
    getFilterTC,
    postVacancyTC
}))(NewVacancy);