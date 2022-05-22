import React from 'react';
import classes from './MyProfile.less';
import avatar from "../../assets/avatar.png";
import Button from "../Common/FormControl/Button";
import EmployerForm from "./EmployerForm";
import {FullEmployerDataType} from "../../types/types";

type Props = {
    userData: FullEmployerDataType
    editForm: boolean
    setEditForm: (edit: boolean) => void
    onSubmit: (values: any) => void
    onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
    photo: string | null
}

const EmployerProfile: React.FC<Props> = (props) => {
    const userData = props.userData;

    return (
        props.editForm
            ? <EmployerForm onSubmit={props.onSubmit} setEditForm={props.setEditForm} info={props.userData}/>
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
                    <p><b>Департамент:</b> {userData.department}</p>
                </div>
                <div className={classes.ProfileAreaWithButton}>
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

export default EmployerProfile;
