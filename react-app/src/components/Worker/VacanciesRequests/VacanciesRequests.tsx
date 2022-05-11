import React, {useEffect, useState} from 'react';
import classes from './VacanciesRequests.less';
import Button from "../../Common/FormControl/Button";
import VacanciesItem from "./VacanciesItem";
import {AppStateType} from "../../../redux/ReduxStore";
import {compose} from "redux";
import {connect} from "react-redux";
import {closeVacancyTC, deleteVacancyTC, getVacanciesTC} from "../../../redux/EmployerVacancyReducer";
import cn from "classnames";

const VacanciesRequests: React.FC<Props> = (props) => {
    const [state] = useState([
        {
            name: "Back-end разработчик",
            id: 1,
            description: "ОченьДлинныйИНеПрерывныйТекстКоторыйДажеНеПомещаетсяПолностьюВЭтотЭкранЕслиТыЭтоЧитаешьЗначитЧтоТоСломалось",
            status: true,
        },
        {
            name: "Front-end разработчик",
            id: 2,
            description: "Тоже большой текст, но теперь с пробелами, но это не должно играть роли, так как если ты видишь и этот текст, то что-то сломалось",
            status: false,
        },
        {
            name: "Аналитик",
            id: 3,
            description: "А это текст поменьше, средненький, самый норм",
            status: false,
        },
        {
            name: "Дизайнер",
            id: 4,
            description: "Вообще маленький текст жесть",
            status: false,
        },
    ])

    /*useEffect(() => {
        props.getVacanciesTC(props.openedVacancies);
    }, [props.openedVacancies])*/

    return (
        <div className={classes.PageContentWrapper}>
            <div className={classes.PageContainer}>
                <div className={classes.PageHeader}>
                    <h2>Мои заявки на вакансии</h2>
                </div>
                <div className={classes.Vacancies}>
                    <div className={cn(classes.VacanciesWrapper, classes.VacanciesTableHeader,
                        classes.VacanciesTableWrapper)}>
                        <div className={classes.Info}>Название</div>
                        <div className={classes.Description}>Описание</div>
                        <div className={classes.Info}>Статус</div>
                    </div>
                    <ul>
                        {
                            state.map(item =>
                                <VacanciesItem key={item.id} vacancy={item}/>)
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: AppStateType) => {
    return {
        //vacancies: state.employerVacancyData.vacancies,
    }
}

type MapStatePropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    //getVacanciesTC: (isOpen: boolean) => void
    //closeVacancyTC: (vacancyId: number, authorId: number) => void
    //deleteVacancyTC: (vacancyId: number, authorId: number) => void
}

type Props = MapStatePropsType & MapDispatchPropsType;

export default compose<React.ComponentType>(connect(mapStateToProps, {
    /*getVacanciesTC,*/
    /*closeVacancyTC,*/
    /*deleteVacancyTC*/
}))(VacanciesRequests);
