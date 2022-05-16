import React, {useEffect} from 'react';
import classes from './Vacancy.less';
import avatar from "../../../assets/avatar.png";
import Button from "../../Common/FormControl/Button";
import {AppStateType} from "../../../redux/ReduxStore";
import {compose} from "redux";
import {connect} from "react-redux";
import {acceptApplicationTC, getVacancyTC, openCloseVacancyTC} from "../../../redux/EmployerVacancyReducer";
import {useParams} from "react-router-dom";
import {withLoading} from "../../../hoc/withLoading/withLoading";

const Vacancy: React.FC<Props> = (props) => {
    const vacancyId = Number(useParams().vacancyId)
    useEffect(() => {
        if (!isNaN(vacancyId))
            props.getVacancyTC(vacancyId);
    }, [])

    if (props.vacancy === null) return null;
    const vacancy = props.vacancy;

    return (
        <div className={classes.PageContentWrapper}>
            <div className={classes.PageContainer}>
                <div className={classes.Vacancy}>
                    <div>
                        <h3>{vacancy.name}</h3>
                        <p className={classes.Description}>{vacancy.salary}</p>
                    </div>
                    <div>
                        <h4>Специальность: {vacancy.specialization}</h4>
                        <p className={classes.Description}>Количество мест: {vacancy.count}</p>
                    </div>
                    <div>
                        <h4>Описание вакансии:</h4>
                        <p>{vacancy.description}</p>
                        <p><b>Тип занятости: </b>{vacancy.type_employment}</p>
                        <p><b>График работы: </b>{vacancy.work_schedule}</p>
                        <h4>Условия:</h4>
                        <p>{vacancy.conditions}</p>
                        <h4>Требования:</h4>
                        <p>{vacancy.requirements}</p>
                        <h4>Обязанности:</h4>
                        <p>{vacancy.duties}</p>
                        <h4>Дополнительно:</h4>
                        <p>{vacancy.additionally}</p>
                    </div>
                    <div>
                        <h4>Навыки для вакансии:</h4>
                        <div>{vacancy.skills.map(skill => skill.name).join(", ")}</div>
                    </div>
                    <div>
                        <h4>Найденные сотрудники:</h4>
                        {
                            vacancy.accepted.map(employee => <EmployeeItem key={employee} avatar={""}
                                                                                 name={employee}/>)
                        }
                    </div>
                    <div>
                        <h4>Откликнувшиеся сотрудники:</h4>
                        {
                            vacancy.job_apps.map(response => <div key={response.job_app_id}
                                                                        className={classes.VacancyWrapper}>
                                <p>{response.username}</p>
                                <Button type={"button"} size={"small"}
                                        onClick={() => props.acceptApplicationTC(response.job_app_id, vacancy.id)}>
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
                            vacancy.is_open
                                ? <Button type={"button"} color={"red"}
                                          onClick={() => props.openCloseVacancyTC(vacancy.id, vacancy.is_open)}>
                                    Закрыть вакансию
                                </Button>
                                : <Button type={"button"} color={"green"}
                                          onClick={() => props.openCloseVacancyTC(vacancy.id, vacancy.is_open)}>
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
}), withLoading)(Vacancy);