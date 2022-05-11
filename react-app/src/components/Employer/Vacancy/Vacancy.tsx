import React, {useEffect, useState} from 'react';
import classes from './Vacancy.less';
import avatar from "../../../assets/avatar.png";
import Button from "../../Common/FormControl/Button";
import {AppStateType} from "../../../redux/ReduxStore";
import {compose} from "redux";
import {connect} from "react-redux";
import {getVacancyTC} from "../../../redux/EmployerVacancyReducer";
import {useParams} from "react-router-dom";

const Vacancy: React.FC<Props> = (props) => {
    const [state] = useState({
        foundEmployees: [{avatar: "", name: "Клим Саныч"}, {avatar: "", name: "Дим Юрич"}],
        responded: [{name: "Дядя Богдан", id: 0}, {name: "Геральт из Ривии", id: 1}]
    })

    const vacancyId = Number(useParams().vacancyId)
    useEffect(() => {
        if (!isNaN(vacancyId))
            props.getVacancyTC(vacancyId);
    }, [])

    if (props.vacancy === null) return null;

    return (
        <div className={classes.PageContentWrapper}>
            <div className={classes.PageContainer}>
                <div className={classes.Vacancy}>
                    <div>
                        <h3>{props.vacancy.name}</h3>
                        <p className={classes.Description}>{props.vacancy.salary}</p>
                    </div>
                    <div>
                        <h4>Специальность: {props.vacancy.specialization}</h4>
                        <p className={classes.Description}>Количество мест: {props.vacancy.count}</p>
                    </div>
                    <div>
                        <h4>Описание вакансии:</h4>
                        <p>{props.vacancy.description}</p>
                        <p><b>Тип занятости: </b>{props.vacancy.type_employment}</p>
                        <p><b>График работы: </b>{props.vacancy.work_schedule}</p>
                        <h4>Условия:</h4>
                        <p>{props.vacancy.conditions}</p>
                        <h4>Требования:</h4>
                        <p>{props.vacancy.requirements}</p>
                        <h4>Обязанности:</h4>
                        <p>{props.vacancy.duties}</p>
                        <h4>Дополнительно:</h4>
                        <p>{props.vacancy.additionally}</p>
                    </div>
                    <div>
                        <h4>Навыки для вакансии:</h4>
                        <div>{props.vacancy?.skills?.join(", ")}</div>
                    </div>
                    <div>
                        <h4>Найденные сотрудники:</h4>
                        {
                            state.foundEmployees.map(employee => <EmployeeItem key={employee.name} {...employee}/>)
                        }
                    </div>
                    <div>
                        <h4>Откликнувшиеся сотрудники:</h4>
                        {
                            state.responded.map(response => <div key={response.id} className={classes.VacancyWrapper}>
                                <p>{response.name}</p>
                                <Button type={"button"} size={"small"} onClick={() => console.log('принять')}>
                                    Принять заявку
                                </Button>
                                <Button type={"button"} size={"small"} to={`/search/${response.id}`}>
                                    Страница резюме
                                </Button>
                            </div>)
                        }
                    </div>
                    <div className={classes.ButtonWrapper}>
                        {
                            props.vacancy.is_open
                                ? <Button type={"button"} color={"red"}>Закрыть вакансию</Button>
                                : <Button type={"button"} color={"green"}>Открыть вакансию</Button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

const EmployeeItem = (props: { avatar: any, name: string }) => {
    return (
        <div className={classes.EmployeeWrapper}>
            <div className={classes.ProfileAvatarSmall}>
                <img width={50} height={50} src={avatar} alt={"avatar"}/>
            </div>
            <p>{props.name}</p>
        </div>
    );
}

const mapStateToProps = (state: AppStateType) => {
    return {
        vacancy: state.employerVacancyData.vacancy,
    }
}

type MapStatePropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    getVacancyTC: (id: number) => void
}

type Props = MapStatePropsType & MapDispatchPropsType;

export default compose<React.ComponentType>(connect(mapStateToProps, {getVacancyTC}))(Vacancy);