import React, {useState} from 'react';
import classes from './ProfileList.less';
import Filter from "../Filter/Filter";
import {useNavigate} from "react-router-dom";
import avatar from "../../assets/avatar.png";
import LikeButton from "../Common/FormControl/LikeButton";
import Button from "../Common/FormControl/Button";

interface PropsType {
    state: ProfileItemType[];
}

type ProfileItemType = {
    id: number,
    name: string,
    speciality: string,
    avatar: any,
    experience: number,
    competence: string[],
    liked: boolean,
}

const ProfileList: React.FC<PropsType> = (props) => {
    return (
        <div className={classes.ContentWrapperWithFilter}>
            <div>
                <Filter/>
            </div>
            <div>
                <h2>Найдено людей по запросу: {props.state.length}</h2>
                <ul className={classes.ProfileItemsWrapper}>
                    {
                        props.state.map(item => <ProfileItem key={item.id} {...item}/>)
                    }
                </ul>
            </div>
        </div>
    );
};

const ProfileItem = (props: ProfileItemType) => {
    const [liked, setLiked] = useState(props.liked);
    const navigate = useNavigate();
    return (
        <li className={classes.ProfileItem}>
            <div className={classes.ProfileAvatar}>
                <img width={125} height={125} src={avatar} alt="avatar"/>
            </div>
            <div className={classes.ProfileInfo}>
                <h3 className={classes.ProfileName}>{props.name}</h3>
                <p>Специальность: {props.speciality}</p>
                <p>Стаж: {props.experience} лет</p>
                <p>Навыки: {props.competence.join(", ")}</p>
            </div>
            <div className={classes.ProfileAction}>
                <LikeButton liked={liked} onClick={() => setLiked(!liked)}/>
                <Button type={"button"} size={"large"} to={`/search/${props.id}`}>
                    Посмотреть профиль
                </Button>
            </div>
        </li>
    );
}

export default ProfileList;