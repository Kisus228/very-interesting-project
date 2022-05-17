import React, {useState} from 'react';
import classes from './MyProfile.less';
import avatar from "../../assets/avatar.png";
import Button from "../Common/FormControl/Button";
import {AppStateType} from "../../redux/ReduxStore";
import {compose} from "redux";
import {connect} from "react-redux";
import Contacts from "../Common/Contacts/Contacts";
import WorkerForm from "./WorkerForm";
import EmployerForm from "./EmployerForm";

const MyProfile: React.FC<Props> = (props) => {
    const [state] = useState({
        firstName: "Сергей",
        secondName: "Кашкин",
        middleName: "Сергеевич",
        email: "sergey.k.alt2000@gmail.com",
        department: "Департамент лени",
        birthday: new Date(2001, 7, 30),
        specialization: "Фронтовик",
        experience: 1,
        skills: [{name: "HTML", id: 1}, {name: "JS", id: 2}, {name: "CSS", id: 3}],
        resume_text: "Сергей 19 лет, настоящий кекс., обучается в ирит-ртф, обладает навыками программиста и дизайнера, а также работал проводником. Гордится тем, что добился всего сам. Сергей больше не станет тратить время на моделей и кривляк с завышенной самооценкой. Ищет путеводную звезду для его сердца.",
        about_me: "Возьмите на работу пжж",
        vk: "https://vk.com/vsalt",
        github: "https://github.com/",
    })

    const [editForm, setEditForm] = useState(false);

    const initialValues = {
        firstName: state.firstName,
        secondName: state.secondName,
        middleName: state.middleName,
        email: state.email,
    }

    const onSubmit = (values: any) => {
        console.log(values);
        setEditForm(false);
    }

    const getAge = (birthday: Date) => {
        const now = new Date();
        const age = now.getFullYear() - birthday.getFullYear();
        return now < new Date(now.getFullYear(), birthday.getMonth(), birthday.getDate()) ? age - 1 : age;
    }

    return (
        <div className={classes.PageContentWrapper}>
            <div className={classes.PageContainer}>
                <h2>Мой профиль</h2>
                {
                    editForm
                        ? props.isWorker
                            ? <WorkerForm onSubmit={onSubmit} setEditForm={setEditForm} info={state}/>
                            : <EmployerForm onSubmit={onSubmit} setEditForm={setEditForm} info={state}/>
                        : <div className={classes.ProfileWrapper}>
                            <div className={classes.ProfileAvatar}>
                                <img width={200} height={200} src={avatar} alt={"avatar"}/>
                            </div>
                            <div>
                                <p><b>Имя:</b> {state.firstName}</p>
                                <p><b>Фамилия:</b> {state.secondName}</p>
                                <p><b>Отчество:</b> {state.middleName}</p>
                                <p><b>Почта:</b> {state.email}</p>
                                {
                                    props.isWorker
                                        ? <>
                                            <h4>Контактные данные:</h4>
                                            <Contacts contacts={state}/>
                                        </>
                                        : <p><b>Департамент:</b> {state.department}</p>
                                }
                            </div>
                            <div className={classes.ProfileAreaWithButton}>
                                {
                                    props.isWorker && <>
                                        <p><b>Возраст:</b> {getAge(state.birthday)}</p>
                                        <p><b>Специальность:</b> {state.specialization}</p>
                                        <p><b>Стаж:</b> {state.experience} лет</p>
                                        <p><b>Навыки:</b> {state.skills.map(skill => skill.name).join(", ")}</p>
                                        <h4>Резюме:</h4>
                                        <p>{state.resume_text}</p>
                                        <h4>О себе:</h4>
                                        <p>{state.about_me}</p>
                                    </>
                                }
                                <div className={classes.ButtonWrapper}>
                                    <div>
                                        <Button type="button" onClick={() => setEditForm(true)} color="green">
                                            Изменить
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                }
            </div>
        </div>
    );
};

const mapStateToProps = (state: AppStateType) => {
    return {
        isWorker: state.authData.isWorker,
    }
}

type MapStatePropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {}

type Props = MapStatePropsType & MapDispatchPropsType;

export default compose<React.ComponentType>(connect(mapStateToProps, {}))(MyProfile);