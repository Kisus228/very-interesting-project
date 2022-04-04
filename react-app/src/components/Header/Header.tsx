import React from 'react';
// @ts-ignore
import classes from "./Header.less";
import logo from './../../assets/logo.png';
import avatar from './../../assets/avatar.png';

// TODO: Сергей Кашкин | Верстка: Сделать отцентровку изображения в квадрат без сжатия.
// TODO: Сергей Кашкин | Верстка: Добавить выпадашку при нажатии на кнопку профиля.
// TODO: Сергей Кашкин | Верстка: Подумать над шрифтами.
// TODO: Сергей Кашкин | Верстка: Добавить медиа запросы для адаптива.

const Header = () => {
    return (
        <header className={classes.Header}>
            <div className={classes.Logo}>
                <img width={110} height={28} src={logo} alt={"logo"}/>
            </div>
            <div className={classes.Menu}>
                <button className={classes.Button}>
                    <div className={classes.ProfileInfo}>
                        <p>Сергей Сергеич</p>
                        <p className={classes.Description}>Проводник, фронтовик, сосочка</p>
                    </div>
                    <div className={classes.ProfileAvatar}>
                        <img width={50} height={50} src={avatar} alt={"avatar"}/>
                    </div>
                    <div>
                        <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
                            <path d="M1 1L7 7L13 1" stroke="#C9CED6" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                        </svg>
                    </div>
                </button>
                <div className={classes.Stroke}/>
                <button className={classes.Button}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
                            stroke="#C9CED6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16 17L21 12L16 7" stroke="#C9CED6" strokeWidth="2" strokeLinecap="round"
                              strokeLinejoin="round"/>
                        <path d="M21 12H9" stroke="#C9CED6" strokeWidth="2" strokeLinecap="round"
                              strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>
        </header>
    );
};

export default Header;