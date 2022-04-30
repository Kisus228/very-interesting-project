import React, {useState} from 'react';
import classes from './Vacancies.less';
import Button from "../Common/FormControl/Button";
import Vacancies from "./Vacancies";

const OpenedVacancies = () => {
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

    return (
        <div className={classes.PageContentWrapper}>
            <div className={classes.PageContainer}>
                <div className={classes.PageHeader}>
                    <h2>Мои вакансии</h2>
                    <div className={classes.HeaderButtons}>
                        <Button type={"button"} size={"small"} color={"green"} to={"/vacancies/new"}>Новая вакансия</Button>
                        <Button type={"button"} size={"small"} to={"/vacancies/history"}>История вакансий</Button>
                    </div>
                </div>
                <Vacancies state={state}/>
            </div>
        </div>
    );
};

export default OpenedVacancies;