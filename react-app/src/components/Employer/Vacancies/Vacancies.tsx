import React, {useEffect, useState} from 'react';
import classes from './Vacancies.less';
import Button from "../../Common/FormControl/Button";
import VacanciesItem from "./VacanciesItem";
import {AppStateType} from "../../../redux/ReduxStore";
import {compose} from "redux";
import {connect} from "react-redux";
import {getVacanciesTC} from "../../../redux/VacansyReducer";
import cn from "classnames";

const Vacancies: React.FC<Props> = (props) => {
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
        props.getVacanciesTC(props.openedVacancies);
    }, [props.openedVacancies])

    return (
        <div className={classes.PageContentWrapper}>
            <div className={classes.PageContainer}>
                <div className={classes.PageHeader}>
                    <PageHeader openedVacancies={props.openedVacancies}/>
                </div>
                <div className={classes.Vacancies}>
                    <div className={cn(classes.VacanciesWrapper, classes.VacanciesTableHeader,
                        classes.VacanciesTableWrapper)}>
                        <div>Название</div>
                        <div>Кол-во откликов</div>
                        <div>Найдено</div>
                        <div>Статус</div>
                    </div>
                    <ul>
                        {props.vacancies.map(item => <VacanciesItem key={item.id} {...item}/>)}
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
        vacancies: state.vacancyData.vacancies,
    }
}

type MapStatePropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    getVacanciesTC: (isOpen: boolean) => void
}

type OwnPropsType = {
    openedVacancies: boolean
}

type Props = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

export default compose(connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {getVacanciesTC}))(Vacancies);