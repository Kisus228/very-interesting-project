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
import {getVacancyTC, postVacancyTC, putVacancyTC} from "../../../redux/VacansyReducer";
import {getDataForSubmit, getInitialValuesForEdit} from "./InitForm";
import VacancyForm from "./VacancyForm";

export interface ValuesType {
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
    const vacancyId = Number(useParams().vacancyId);

    useEffect(() => {
        props.getFilterTC();
        props.getVacancyTC(vacancyId);
    }, [])

    const navigate = useNavigate();

    if (props.vacancy === null) return null

    const initialValues = getInitialValuesForEdit(props.vacancy);


    const onSubmit = (values: ValuesType) => {
        props.putVacancyTC(vacancyId, getDataForSubmit(values))
        navigate("/vacancies");
    }

    return <VacancyForm onSubmit={onSubmit} initialValues={initialValues} editForm={true} skills={props.skills}/>
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
    getVacancyTC: (id: number) => void
    putVacancyTC: (id: number, data: VacancyExpendsType) => void
}

type Props = MapStatePropsType & MapDispatchPropsType;

export default compose<React.ComponentType>(connect(mapStateToProps, {
    getFilterTC,
    getVacancyTC,
    putVacancyTC
}))(NewVacancy);