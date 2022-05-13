import React, {useEffect, useState} from 'react';
import classes from './Vacancy.less';
import avatar from "../../../assets/avatar.png";
import Button from "../../Common/FormControl/Button";
import {AppStateType} from "../../../redux/ReduxStore";
import {compose} from "redux";
import {connect} from "react-redux";
import {getVacancyTC, sendRequestTC} from "../../../redux/WorkerVacancyReducer";
import {useParams} from "react-router-dom";
import LikeButton from "../../Common/FormControl/LikeButton";

const Vacancy: React.FC<Props> = (props) => {
    const [state] = useState({
        foundEmployees: [{avatar: "", name: "Клим Саныч"}, {avatar: "", name: "Дим Юрич"}]
    })

    const vacancyId = Number(useParams().vacancyId)
    useEffect(() => {
        if (!isNaN(vacancyId))
            props.getVacancyTC(vacancyId);
    }, [])

    const [liked, setLiked] = useState(false)

    if (props.vacancy === null) return null;

    const id = props.vacancy.id;

    return (
        <div className={classes.PageContentWrapper}>
            <div className={classes.PageContainer}>
                <div className={classes.Vacancy}>
                    <section className={classes.VacancySection}>
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
                    </section>
                    <section className={classes.VacancySection}>
                        <div className={classes.LikeButton}>
                            <LikeButton liked={liked} onClick={() => setLiked(!liked)}/>
                        </div>
                        <div className={classes.ProfileAvatarWrapper}>
                            <div className={classes.ProfileAvatarLarge}>
                                <img width={150} height={150} src={avatar} alt={"avatar"}/>
                            </div>
                        </div>
                        <div>
                            <h4 className={classes.Name}>{props.vacancy.author}</h4>
                            <p>{props.vacancy.department}</p>
                        </div>
                        <div>
                            <h4>Навыки для вакансии:</h4>
                            <div>{props.vacancy.skills.map(skill => skill.name).join(", ")}</div>
                        </div>
                        <div>
                            <h4>Найденные сотрудники:</h4>
                            {
                                state.foundEmployees.map(employee => <EmployeeItem key={employee.name} {...employee}/>)
                            }
                        </div>
                        <div className={classes.ButtonWrapper}>
                            {
                                props.vacancy.is_registered
                                    ? <Button type={"button"} disabled>Подать заявку</Button>
                                    : <Button type={"button"} onClick={() => props.sendRequestTC(id)} color={"green"}>
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
        vacancy: state.workerVacancyData.vacancy,
    }
}

type MapStatePropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    getVacancyTC: (id: number) => void
    sendRequestTC: (id: number) => void
}

type Props = MapStatePropsType & MapDispatchPropsType;

export default compose<React.ComponentType>(connect(mapStateToProps, {getVacancyTC, sendRequestTC}))(Vacancy);