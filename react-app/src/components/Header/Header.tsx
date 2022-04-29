import React, {useState} from 'react';
import classes from "./Header.less";
import cn from "classnames";
import logo from './../../assets/logo.png';
import avatar from './../../assets/avatar.png';
import {useNavigate} from "react-router-dom";
import {Arrow, Exit} from "../Common/Icons/Icons";

// TODO: Сергей Кашкин | Верстка: Сделать отцентровку изображения в квадрат без сжатия.
// TODO: Сергей Кашкин | Верстка: Подумать над шрифтами.
// TODO: Сергей Кашкин | Верстка: Добавить медиа запросы для адаптива.

const Header = () => {
    const [openedProfileMenu, setOpenedProfileMenu] = useState(false);
    const navigate = useNavigate();

    const onClickProfileInfo = () => {
        setOpenedProfileMenu(true);
    }

    const onBlurProfileInfo = () => {
        setOpenedProfileMenu(false);
    }

    const onClickProfileMenu = (e: React.SyntheticEvent) => {
        e.stopPropagation();
        setOpenedProfileMenu(false);
        navigate("profile");
    }

    return (
        <header className={classes.Header}>
            <div className={classes.Logo}>
                <img width={110} height={28} src={logo} alt={"logo"}/>
            </div>
            <div className={classes.Menu}>
                <button className={classes.Button} onClick={onClickProfileInfo} onBlur={onBlurProfileInfo}>
                    <div className={classes.ProfileInfo}>
                        <p>Сергей Сергеич</p>
                        <p className={classes.Description}>Проводник, фронтовик, сосочка</p>
                    </div>
                    <div className={classes.ProfileAvatar}>
                        <img width={50} height={50} src={avatar} alt={"avatar"}/>
                    </div>
                    <div>
                        <Arrow color={"#C9CED6"}/>
                    </div>
                    {
                        openedProfileMenu &&
                        <div className={classes.ProfileMenuWrapper}>
                            <div onClick={onClickProfileMenu} className={classes.ProfileMenuContent}>
                                <svg width="20" height="20" viewBox="0 0 25 30" fill="none">
                                    <path
                                        d="M8.07692 8H17.8077M8.07692 22H17.8077M8.07692 15H16.0385M23 1H2C1.44772 1 1 1.44771 1 2V28C1 28.5523 1.44772 29 2 29H23C23.5523 29 24 28.5523 24 28V2C24 1.44771 23.5523 1 23 1Z"
                                        stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <span>Мой профиль</span>
                            </div>
                        </div>
                    }
                </button>
                <div className={classes.Stroke}/>
                <button className={classes.Button}>
                    <Exit/>
                </button>
            </div>
        </header>
    );
};

export default Header;
