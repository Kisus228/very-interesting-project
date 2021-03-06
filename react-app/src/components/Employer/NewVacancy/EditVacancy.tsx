import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {compose} from "redux";
import {connect} from "react-redux";
import {getFilterTC} from "../../../redux/FilterReducer"
import {AppStateType} from "../../../redux/ReduxStore";
import {getVacancyTC, putVacancyTC} from "../../../redux/EmployerVacancyReducer";
import {getDataForSubmit, getInitialValuesForEdit, ValuesType} from "./InitForm";
import VacancyForm from "./VacancyForm";

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
        props.putVacancyTC(vacancyId, getDataForSubmit(values, props.author))
        navigate("/vacancies");
    }

    return <VacancyForm onSubmit={onSubmit} initialValues={initialValues} editForm={true} skills={props.skills}/>
};

const mapStateToProps = (state: AppStateType) => {
    return {
        skills: state.filterData.skills,
        vacancy: state.employerVacancyData.vacancy,
        author: state.authData.id
    }
}

type MapStatePropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    getFilterTC: () => void
    getVacancyTC: (id: number) => void
    putVacancyTC: (id: number, data: any) => void
}

type Props = MapStatePropsType & MapDispatchPropsType;

export default compose<React.ComponentType>(connect(mapStateToProps, {
    getFilterTC,
    getVacancyTC,
    putVacancyTC
}))(NewVacancy);
