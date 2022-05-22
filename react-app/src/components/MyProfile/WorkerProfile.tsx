import React from 'react';
import classes from './MyProfile.less';
import avatar from "../../assets/avatar.png";
import Button from "../Common/FormControl/Button";
import Contacts from "../Common/Contacts/Contacts";
import WorkerForm from "./WorkerForm";
import {CompetenceType, FullWorkerDataType} from "../../types/types";

type Props = {
    userData: FullWorkerDataType
    editForm: boolean
    setEditForm: (edit: boolean) => void
    onSubmit: (values: any) => void
    onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
    photo: string | null
}

const WorkerProfile: React.FC<Props> = (props) => {
    const userData = props.userData;

    const getAge = (birthday: Date | null) => {
        if (!birthday) return "Не указан";
        const now = new Date();
        const age = now.getFullYear() - birthday.getFullYear();
        return now < new Date(now.getFullYear(), birthday.getMonth(), birthday.getDate()) ? age - 1 : age;
    }

    return (
        props.editForm
            ? <WorkerForm onSubmit={props.onSubmit} setEditForm={props.setEditForm} info={props.userData}/>
            : <div className={classes.ProfileWrapper}>
                <div className={classes.ProfileAvatar}>
                    <img width={200} height={200} src={props.photo || avatar} alt={"avatar"}/>
                    <div className={classes.onHoverPhoto}>
                        <div className={classes.AvatarSettings}/>
                        <input type="file" accept="image/jpeg,image/png" className={classes.InputFile}
                               onChange={props.onUpload}/>
                    </div>
                </div>
                <div>
                    <p><b>Имя:</b> {userData.name}</p>
                    <p><b>Фамилия:</b> {userData.lastName}</p>
                    <p><b>Отчество:</b> {userData.patronymic}</p>
                    <p><b>Почта:</b> {userData.email}</p>
                    <h4>Контактные данные:</h4>
                    <Contacts contacts={userData}/>
                </div>
                <div className={classes.ProfileAreaWithButton}>
                    <p><b>Возраст:</b> {getAge(userData.birthDay)}</p>
                    <p><b>Специальность:</b> {userData.specialization}</p>
                    <p><b>Стаж:</b> {userData.experience} лет</p>
                    <p>
                        <b>Навыки:</b>
                        {" " + userData.skills.map((skill: CompetenceType) => skill.name).join(", ")}
                    </p>
                    <h4>Резюме:</h4>
                    <p>{userData.resume}</p>
                    <h4>О себе:</h4>
                    <p>{userData.aboutMe}</p>
                    <div className={classes.ButtonWrapper}>
                        <div>
                            <Button type="button" onClick={() => props.setEditForm(true)} color="green">
                                Изменить
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default WorkerProfile;
