import React, {useState} from 'react';
import classes from './Vacancies.less';
import Button from "../Common/FormControl/Button";

interface Props {
    name: string,
    count: number,
    find: number,
    total: number,
    status: string,
}

const HistoryVacancies = () => {
    const [state] = useState<Props[]>([
        {
            name: "Верстальщик для сайтов",
            count: 1,
            find: 0,
            total: 2,
            status: "Закрыта",
        },
        {
            name: "SEO",
            count: 6,
            find: 3,
            total: 3,
            status: "Закрыта",
        },
        {
            name: "Аналитик",
            count: 1,
            find: 1,
            total: 3,
            status: "Закрыта",
        },
    ])

    return (
        <ul>
            {state.map(item => <VacanciesItem key={item.name} {...item}/>)}
        </ul>
    );
};

const VacanciesItem: React.FC<Props> = (props) => {
    return (
        <li className={classes.VacanciesTableWrapper}>
            <div>{props.name}</div>
            <div>{props.count}</div>
            <div>{props.find} из {props.total}</div>
            <div>{props.status}</div>
            <div className={classes.VacanciesButtons}>
                <Button size={"small"}>Страница вакансии</Button>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M16 9C16 12.866 12.866 16 9 16C5.13401 16 2 12.866 2 9C2 5.13401 5.13401 2 9 2C12.866 2 16 5.13401 16 9ZM18 9C18 13.9706 13.9706 18 9 18C4.02944 18 0 13.9706 0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9ZM10 6C10 5.44772 9.55228 5 9 5C8.44772 5 8 5.44772 8 6V8H6C5.44772 8 5 8.44772 5 9C5 9.55228 5.44772 10 6 10H8V12C8 12.5523 8.44772 13 9 13C9.55228 13 10 12.5523 10 12V10H12C12.5523 10 13 9.55228 13 9C13 8.44772 12.5523 8 12 8H10V6Z"
                          fill="#000000"/>
                </svg>
                <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M6.44152 0C5.15023 0 4.00381 0.82629 3.59547 2.05132L3.27924 3H2H1C0.447715 3 0 3.44772 0 4C0 4.55228 0.447715 5 1 5V17C1 17.5523 1.44772 18 2 18H12C12.5523 18 13 17.5523 13 17V5C13.5523 5 14 4.55228 14 4C14 3.44772 13.5523 3 13 3H12H10.7208L10.4045 2.05132C9.99619 0.82629 8.84977 0 7.55848 0H6.44152ZM11 5H10H4H3V16H11V5ZM8.61257 3L8.50716 2.68377C8.37105 2.27543 7.98891 2 7.55848 2H6.44152C6.01109 2 5.62895 2.27543 5.49284 2.68377L5.38743 3H8.61257Z"
                          fill="#000000"/>
                </svg>
            </div>
        </li>
    );
}

export default HistoryVacancies;