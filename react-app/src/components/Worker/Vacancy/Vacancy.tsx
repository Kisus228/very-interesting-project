import React, {useEffect, useState} from 'react';
import classes from './Vacancy.less';
import avatar from "../../../assets/avatar.png";
import Button from "../../Common/FormControl/Button";
import {AppStateType} from "../../../redux/ReduxStore";
import {compose} from "redux";
import {connect} from "react-redux";
import {getVacancyTC} from "../../../redux/VacansyReducer";
import {useParams} from "react-router-dom";
import LikeButton from "../../Common/FormControl/LikeButton";

const Vacancy: React.FC<Props> = (props) => {
    const [state] = useState({
        vacancyName: "Имитатор программиста",
        salary: "От 30 тысяч раблей в месяц",
        speciality: "Имитатор программиста",
        count: 2,
        vacancyDescription: "Имитировать деятельность программиста.",
        employmentType: "Полный день",
        schedule: "ПН, ВТ, СР, ЧТ, ПТ",
        conditions: "У нас хорошая веб студия, есть 4 крутых специалиста, два дизанера, маркетолог и программист, мы " +
            "справляемся, не берём сверх меры. Но когда к нам приходят клиенты, видят в офисе всего 3 " +
            "человека (с 1, работаем удаленно), думают что мы \"фирма однодневка\" и теряют доверие. В связи с " +
            "этим, мы решили нанять 2-3 человек, имитаторов программиста и имитаторов дизайнера. К окладу " +
            "прилагаются ежедневный кальян, кофе и печеньки, в свободное время можно играть в танки или " +
            "сидеть ВК.",
        requirements: "Наличие подзатасканного свитера (можем предоставить), носителям очков дополнительный плюс, " +
            "\"хлипкий\" внешний вид - приветствуется. Если согласитесь сделать татуировку на видном месте, что " +
            "тона вроде \"Я - KDEраст и горжусь этим\" дадим надбавку к окладу (накинем пару тысяч).",
        responsibilities: "Имитировать деятельность программиста, когда приходят клиенты, открывать код (файлы с кодом " +
            "дадим), внимательно смотерть в монитор, бормоча под нос фразы на вроде \"говорил же надо на " +
            "фрэймворке делать!\", \"о май гад, нет!, уф, я же сделал бэкап...\", \"что за кретин писал этот " +
            "код?!\" и т.д. полный список дадим, обязательно выучить его наизусть, будем спрашивать, раз в " +
            "месяц список будет пополняться.",
        additionally: "Дополнительная информация вставить текст",
        employerName: "Сергей Сергеевич",
        employerAvatar: "",
        employerPosition: "Проводник, фронтовик, сосочка",
        department: "Департамент создания сайтов",
        skills: ["Js", "Soft Skills", "C#", "Front-end"],
        foundEmployees: [{avatar: "", name: "Клим Саныч"}, {avatar: "", name: "Дим Юрич"}]
    })

    const vacancyId = Number(useParams().vacancyId)
    useEffect(() => {
        if (!isNaN(vacancyId))
            props.getVacancyTC(vacancyId);
    }, [])

    const [liked, setLiked] = useState(false)

    return (
        <div className={classes.PageContentWrapper}>
            <div className={classes.PageContainer}>
                <div className={classes.Vacancy}>
                    <section className={classes.VacancySection}>
                        <div>
                            <h3>{props.vacancy.name}</h3>
                            <p className={classes.Description}>{state.salary}</p>
                        </div>
                        <div>
                            <h4>Специальность: {state.speciality}</h4>
                            <p className={classes.Description}>Количество мест: {state.count}</p>
                        </div>
                        <div>
                            <h4>Описание вакансии:</h4>
                            <p>{props.vacancy.description}</p>
                            <p><b>Тип занятости: </b>{state.employmentType}</p>
                            <p><b>График работы: </b>{state.schedule}</p>
                            <h4>Условия:</h4>
                            <p>{state.conditions}</p>
                            <h4>Требования:</h4>
                            <p>{state.requirements}</p>
                            <h4>Обязанности:</h4>
                            <p>{state.responsibilities}</p>
                            <h4>Дополнительно:</h4>
                            <p>{state.additionally}</p>
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
                            <p className={classes.Description}>{state.employerPosition}</p>
                            <p>{state.department}</p>
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
                        <div className={classes.ButtonWrapper}>
                            {
                                props.vacancy.is_open
                                    ? <Button type={"button"} color={"red"}>Отменить заявку</Button>
                                    : <Button type={"button"} color={"green"}>Подать заявку</Button>
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
        vacancy: state.vacancyData.vacancy,
    }
}

type MapStatePropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    getVacancyTC: (id: number) => void
}

type Props = MapStatePropsType & MapDispatchPropsType;

export default compose<React.ComponentType>(connect(mapStateToProps, {getVacancyTC}))(Vacancy);