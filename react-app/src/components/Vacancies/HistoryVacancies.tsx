import React, {useState} from 'react';
import classes from './Vacancies.less';
import Vacancies from "./Vacancies";

const HistoryVacancies = () => {
    const [state] = useState([
        {
            name: "Верстальщик для сайтов",
            id: 4,
            count: 1,
            find: 0,
            total: 2,
            status: "Закрыта",
        },
        {
            name: "SEO",
            id: 5,
            count: 6,
            find: 3,
            total: 3,
            status: "Закрыта",
        },
        {
            name: "Аналитик",
            id: 6,
            count: 1,
            find: 1,
            total: 3,
            status: "Закрыта",
        },
    ])

    return (
        <div>
            <div className={classes.PageHeader}>
                <h2>История вакансий</h2>
            </div>
            <Vacancies state={state}/>
        </div>
    );
};

export default HistoryVacancies;