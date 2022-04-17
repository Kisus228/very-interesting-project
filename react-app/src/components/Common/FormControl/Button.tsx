import React from 'react';
import classes from './Button.less';
import {Link} from "react-router-dom";
import cn from "classnames";

interface PropsType {
    onClick?: () => void;
    size?: "small" | "large";
    color?: "red";
    to?: string;
}

const Button: React.FC<PropsType> = (props) => {
    const style = cn(classes.button, {
        [classes.small]: props.size === "small",
        [classes.large]: props.size === "large",
        [classes.redButton]: props.color === "red",
    });

    return (
        !!props.to
            ? <Link to={props.to} onClick={props.onClick} className={style}>{props.children}</Link>
            : <button onClick={props.onClick} className={style}>{props.children}</button>
    );
};

export default Button;
