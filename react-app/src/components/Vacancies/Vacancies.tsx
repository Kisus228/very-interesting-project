import React, {useState} from 'react';
import classes from './Vacancies.less';
import Button from "../Common/FormControl/Button";
import cn from "classnames";

interface Props {
    name: string,
    count: number,
    find: number,
    total: number,
    status: string,
}

const Vacancies = () => {
    const [state] = useState<Props[]>([
        {
            name: "Back-end разработчик",
            count: 3,
            find: 1,
            total: 2,
            status: "Открыта",
        },
        {
            name: "Front-end разработчик",
            count: 6,
            find: 0,
            total: 2,
            status: "Открыта",
        },
        {
            name: "Аналитик",
            count: 1,
            find: 0,
            total: 2,
            status: "Открыта",
        },
        {
            name: "Дизайнер",
            count: 14,
            find: 1,
            total: 3,
            status: "Открыта",
        },
    ])

    return (
        <div>
            <div className={classes.PageHeader}>
                <h2>Мои вакансии</h2>
                <div className={classes.HeaderButtons}>
                    <Button size={"small"}>Новая вакансия</Button>
                    <Button size={"small"}>История вакансий</Button>
                </div>
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
                    {
                        state.map(item => <VacanciesItem key={item.name} {...item}/>)
                    }
                </ul>
            </div>
        </div>
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
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M17.2071 6.25174C17.9814 5.47745 18.1599 4.49514 17.9806 3.59852C17.8083 2.73683 17.312 1.94242 16.7071 1.33753C16.1023 0.73264 15.3078 0.236395 14.4462 0.0640563C13.5495 -0.115268 12.5672 0.0632375 11.7929 0.837529L2.29293 10.3375C2.18315 10.4473 2.10044 10.5811 2.05135 10.7284L0.0513546 16.7284C-0.068425 17.0877 0.025098 17.4839 0.292932 17.7517C0.560764 18.0196 0.956931 18.1131 1.31627 17.9933L7.31627 15.9933C7.46355 15.9442 7.59737 15.8615 7.70715 15.7517L17.2071 6.25174ZM13.2071 2.25174C13.4329 2.02603 13.7005 1.95454 14.0539 2.02522C14.4422 2.10288 14.8978 2.35664 15.2929 2.75174C15.688 3.14685 15.9418 3.60245 16.0195 3.99075C16.0901 4.34414 16.0186 4.61182 15.7929 4.83753L15 5.63043L12.4143 3.04464L13.2071 2.25174ZM11 4.45885L3.87407 11.5848L2.58118 15.4635L6.45986 14.1706L13.5858 7.04464L11 4.45885Z"
                          fill="#000000"/>
                </svg>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 1L7 7M7 7L13 13M7 7L13 1M7 7L1 13" stroke="#000000" strokeWidth="2"
                          strokeLinecap="round"/>
                </svg>
            </div>
        </li>
    );
}

export default Vacancies;