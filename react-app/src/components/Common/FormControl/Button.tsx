import React from 'react';
import classes from './Button.less';
import {Link} from "react-router-dom";
import cn from "classnames";

interface PropsType {
    onClick?: () => void;
    size?: "small" | "large";
    color?: "red" | "green";
    to?: string;
    type: "submit" | "button";
}

const Button: React.FC<PropsType> = (props) => {
    const style = cn(classes.button, {
        [classes.small]: props.size === "small",
        [classes.large]: props.size === "large",
        [classes.redButton]: props.color === "red",
        [classes.greenButton]: props.color === "green",
    });

    return (
        !!props.to
            ? <Link to={props.to} onClick={props.onClick} className={style}>{props.children}</Link>
            : <button type={props.type} onClick={props.onClick} className={style}>{props.children}</button>
    );
};

export default Button;
