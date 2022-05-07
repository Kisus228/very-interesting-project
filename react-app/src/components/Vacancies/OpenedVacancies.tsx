import React, {useEffect, useState} from 'react';
import classes from './Vacancies.less';
import Button from "../Common/FormControl/Button";
import Vacancies from "./Vacancies";
import {AppStateType} from "../../redux/ReduxStore";
import {compose} from "redux";
import {connect} from "react-redux";
import {getVacanciesTC} from "../../redux/VacansyReducer";
import {useLocation} from "react-router-dom";

const OpenedVacancies: React.FC<Props> = (props) => {
    const [state] = useState([
        {
            name: "Back-end разработчик",
            id: 0,
            count: 3,
            find: 1,
            total: 2,
            status: "Открыта",
        },
        {
            name: "Front-end разработчик",
            id: 1,
            count: 6,
            find: 0,
            total: 2,
            status: "Открыта",
        },
        {
            name: "Аналитик",
            id: 2,
            count: 1,
            find: 0,
            total: 2,
            status: "Открыта",
        },
        {
            name: "Дизайнер",
            id: 3,
            count: 14,
            find: 1,
            total: 3,
            status: "Открыта",
        },
    ])

    useEffect(() => {
        props.getVacanciesTC();
    }, [])

    return (
        <div className={classes.PageContentWrapper}>
            <div className={classes.PageContainer}>
                <div className={classes.PageHeader}>
                    <PageHeader openedVacancies={props.openedVacancies}/>
                </div>
                <Vacancies vacancies={props.vacancies} openedVacancies={props.openedVacancies}/>
            </div>
        </div>
    );
};

const PageHeader = (props: { openedVacancies: boolean }) => {
    return props.openedVacancies
        ?
        <>
            <h2>Мои вакансии</h2>
            <div className={classes.HeaderButtons}>
                <Button type={"button"} size={"small"} color={"green"} to={"/vacancies/new"}>Новая
                    вакансия</Button>
                <Button type={"button"} size={"small"} to={"/vacancies/history"}>История
                    вакансий</Button>
            </div>
        </>
        : <h2>История вакансий</h2>
}

const mapStateToProps = (state: AppStateType) => {
    return {
        vacancies: state.vacancyData.vacancies,
    }
}

type MapStatePropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    getVacanciesTC: () => void
}

type OwnPropsType = {
    openedVacancies: boolean
}

type Props = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

export default compose(connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {getVacanciesTC}))(OpenedVacancies);