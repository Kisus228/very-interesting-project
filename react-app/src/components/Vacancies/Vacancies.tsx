import React from 'react';
import classes from './Vacancies.less';
import Button from "../Common/FormControl/Button";
import cn from "classnames";
import {Outlet, useLocation} from 'react-router-dom';

const Vacancies = () => {
    const location = useLocation();

    return (
        <div>
            {
                location.pathname === "/vacancies" && <div className={classes.PageHeader}>
                    <h2>Мои вакансии</h2>
                    <div className={classes.HeaderButtons}>
                        <Button size={"small"}>Новая вакансия</Button>
                        <Button size={"small"} to={"history"}>История вакансий</Button>
                    </div>
                </div>
            }
            {
                location.pathname === "/vacancies/history" && <div className={classes.PageHeader}>
                    <h2>История вакансий</h2>
                </div>
            }
            <div className={classes.Vacancies}>
                <div className={cn(classes.VacanciesWrapper, classes.VacanciesTableHeader,
                    classes.VacanciesTableWrapper)}>
                    <div>Название</div>
                    <div>Кол-во откликов</div>
                    <div>Найдено</div>
                    <div>Статус</div>
                </div>
                <Outlet/>
            </div>
        </div>
    );
};

export default Vacancies;