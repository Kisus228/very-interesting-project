import React, {useState} from 'react';
import classes from './MyProfile.less';
import avatar from "../../assets/avatar.png";

const MyProfile = () => {
    const [state] = useState({
        firstName: "Сергей",
        secondName: "Кашкин",
        middleName: "Сергеевич",
        mail: "sergey.k.alt2000@gmail.com",
    })

    return (
        <div>
            <h2>Мой профиль</h2>
            <div className={classes.Profile}>
                <div className={classes.ProfileAvatar}>
                    <img width={200} height={200} src={avatar} alt={"avatar"}/>
                </div>
                <div>
                    <p><b>Имя:</b> {state.firstName}</p>
                    <p><b>Фамилия:</b> {state.secondName}</p>
                    <p><b>Отчество:</b> {state.middleName}</p>
                    <p><b>Почта:</b> {state.mail}</p>
                    <p><b>Направление:</b> ?</p>
                    <p><b>Департамент:</b> ?</p>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;