import React, {useEffect, useState} from 'react';
import classes from './Vacancy.less';
import avatar from "../../../assets/avatar.png";
import Button from "../../Common/FormControl/Button";
import {AppStateType} from "../../../redux/ReduxStore";
import {compose} from "redux";
import {connect} from "react-redux";
import {getVacancyTC, likeVacancyTC, sendRequestTC} from "../../../redux/WorkerVacancyReducer";
import {useParams} from "react-router-dom";
import LikeButton from "../../Common/FormControl/LikeButton";
import {withLoading} from "../../../hoc/withLoading/withLoading";
import {WorkerVacancyExpendsType} from "../../../types/types";

const Vacancy: React.FC<Props> = (props) => {
    const vacancyId = Number(useParams().vacancyId)
    useEffect(() => {
        if (!isNaN(vacancyId))
            props.getVacancyTC(vacancyId);
    }, [])

    if (props.vacancy === null) return null;

    const vacancy = props.vacancy as WorkerVacancyExpendsType

    return (
        <div className={classes.PageContentWrapper}>
            <div className={classes.PageContainer}>
                <div className={classes.Vacancy}>
                    <section className={classes.VacancySection}>
                        <div>
                            <h3>{vacancy.name}</h3>
                            <p className={classes.Description}>{vacancy.salary}</p>
                        </div>
                    </section>
                    <section className={classes.VacancySection}>
                        <div className={classes.LikeButton}>
                            <LikeButton liked={vacancy.is_liked} onClick={() => likeVacancyTC(vacancy.id, true)}/>
                        </div>
                    </section>
                    <section className={classes.VacancySection}>
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
                    </section>
                    <section className={classes.VacancySection}>
                        <div className={classes.ProfileAvatarWrapper}>
                            <div className={classes.ProfileAvatarLarge}>
                                <img width={150} height={150} src={avatar} alt={"avatar"}/>
                            </div>
                        </div>
                        <div>
                            <h4 className={classes.Name}>{vacancy.author}</h4>
                            <p>{vacancy.department}</p>
                        </div>
                        <div>
                            <h4>Навыки для вакансии:</h4>
                            <div>{vacancy.skills.map(skill => skill.name).join(", ")}</div>
                        </div>
                        <div>
                            <h4>
                                Найдено сотрудников: {vacancy.count - vacancy.free} из {vacancy.count}
                            </h4>
                        </div>
                        <div className={classes.ButtonWrapper}>
                            {
                                vacancy.is_registered
                                    ? <Button type={"button"} disabled>Подать заявку</Button>
                                    : <Button type={"button"} onClick={() => props.sendRequestTC(vacancy.id)} color={"green"}>
                                        Подать заявку
                                    </Button>
                            }
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: AppStateType) => {
    return {
        vacancy: state.workerVacancyData.vacancy
    }
}

type MapStatePropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    getVacancyTC: (id: number) => void
    likeVacancyTC: (id: number, vacancyPage: boolean) => void,
    sendRequestTC: (id: number) => void
}

type Props = MapStatePropsType & MapDispatchPropsType;

export default compose<React.ComponentType>(connect(mapStateToProps, {
    getVacancyTC,
    sendRequestTC,
    likeVacancyTC
}), withLoading)(Vacancy);
