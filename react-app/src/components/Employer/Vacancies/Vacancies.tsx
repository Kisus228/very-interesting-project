import React, {useEffect, useState} from 'react';
import classes from './Vacancies.less';
import Button from "../../Common/FormControl/Button";
import VacanciesItem from "./VacanciesItem";
import {AppStateType} from "../../../redux/ReduxStore";
import {compose} from "redux";
import {connect} from "react-redux";
import {deleteVacancyTC, getVacanciesTC, openCloseVacancyTC} from "../../../redux/EmployerVacancyReducer";
import cn from "classnames";

const Vacancies: React.FC<Props> = (props) => {
    useEffect(() => {
        props.getVacanciesTC(props.openedVacancies);
    }, [props.openedVacancies])

    return (
        <div className={classes.PageContentWrapper}>
            <div className={classes.PageContainer}>
                <div className={classes.PageHeader}>
                    <PageHeader openedVacancies={props.openedVacancies}/>
                </div>
                <div className={classes.VacanciesTable}>
                    <div className={cn(classes.VacanciesWrapper, classes.VacanciesTableHeader,
                        classes.VacanciesTableWrapper)}>
                        <div className={classes.Name}>Название</div>
                        <div className={classes.Info}>Кол-во откликов</div>
                        <div className={classes.Info}>Найдено</div>
                        <div className={classes.Info}>Статус</div>
                    </div>
                    <ul>
                        {
                            props.vacancies.map(item =>
                                <VacanciesItem openCloseVacancy={() => props.openCloseVacancyTC(item.id, item.is_open)}
                                               deleteVacancy={() => props.deleteVacancyTC(item.id, 1)}
                                               key={item.id} vacancy={item}/>)
                        }
                    </ul>
                </div>
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
        vacancies: state.employerVacancyData.vacancies,
    }
}

type MapStatePropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    getVacanciesTC: (isOpen: boolean) => void
    openCloseVacancyTC: (vacancyId: number, isOpen: boolean) => void
    deleteVacancyTC: (vacancyId: number, authorId: number) => void
}

type OwnPropsType = {
    openedVacancies: boolean
}

type Props = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

export default compose(connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
    getVacanciesTC,
    openCloseVacancyTC,
    deleteVacancyTC
}))(Vacancies);