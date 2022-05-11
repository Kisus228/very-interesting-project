import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {compose} from "redux";
import {connect} from "react-redux";
import {getFilterTC} from "../../../redux/FilterReducer"
import {AppStateType} from "../../../redux/ReduxStore";
import {postVacancyTC} from "../../../redux/VacansyReducer";
import {getDataForSubmit, ValuesType} from "./InitForm";
import VacancyForm from "./VacancyForm";

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
        additionally: "",
        id: 0
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
    postVacancyTC: (data: any) => void
}

type Props = MapStatePropsType & MapDispatchPropsType;

export default compose<React.ComponentType>(connect(mapStateToProps, {
    getFilterTC,
    postVacancyTC
}))(NewVacancy);