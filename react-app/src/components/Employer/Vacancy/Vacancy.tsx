import React, {useEffect} from 'react';
import classes from './Vacancy.less';
import avatar from "../../../assets/avatar.png";
import Button from "../../Common/FormControl/Button";
import {AppStateType} from "../../../redux/ReduxStore";
import {compose} from "redux";
import {connect} from "react-redux";
import {acceptApplicationTC, getVacancyTC, openCloseVacancyTC} from "../../../redux/EmployerVacancyReducer";
import {useParams} from "react-router-dom";

const Vacancy: React.FC<Props> = (props) => {
    const vacancyId = Number(useParams().vacancyId)
    useEffect(() => {
        if (!isNaN(vacancyId))
            props.getVacancyTC(vacancyId);
    }, [])

    if (props.vacancy === null) return null;

    const id = props.vacancy.id;
    const isOpen = props.vacancy.is_open;
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
                        <div>{props.vacancy.skills.map(skill => skill.name).join(", ")}</div>
                    </div>
                    <div>
                        <h4>Найденные сотрудники:</h4>
                        {
                            props.vacancy.accepted.map(employee => <EmployeeItem key={employee} avatar={""}
                                                                                 name={employee}/>)
                        }
                    </div>
                    <div>
                        <h4>Откликнувшиеся сотрудники:</h4>
                        {
                            props.vacancy.job_apps.map(response => <div key={response.job_app_id}
                                                                        className={classes.VacancyWrapper}>
                                <p>{response.username}</p>
                                <Button type={"button"} size={"small"}
                                        onClick={() => props.acceptApplicationTC(response.job_app_id, id)}>
                                    Принять заявку
                                </Button>
                                <Button type={"button"} size={"small"} to={`/search/${response.resume_id}`}>
                                    Страница резюме
                                </Button>
                            </div>)
                        }
                    </div>
                    <div className={classes.ButtonWrapper}>
                        {
                            props.vacancy.is_open
                                ? <Button type={"button"} onClick={() => props.openCloseVacancyTC(id, isOpen)}
                                          color={"red"}>
                                    Закрыть вакансию
                                </Button>
                                : <Button type={"button"} onClick={() => props.openCloseVacancyTC(id, isOpen)}
                                          color={"green"}>
                                    Открыть вакансию
                                </Button>
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
    openCloseVacancyTC: (vacancyId: number, isOpen: boolean) => void
    acceptApplicationTC: (acceptId: number, vacancyId: number) => void
}

type Props = MapStatePropsType & MapDispatchPropsType;

export default compose<React.ComponentType>(connect(mapStateToProps, {
    getVacancyTC,
    openCloseVacancyTC,
    acceptApplicationTC
}))(Vacancy);