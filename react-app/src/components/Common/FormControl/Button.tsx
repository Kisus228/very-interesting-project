import React from 'react';
import classes from './Button.less';
import {Link} from "react-router-dom";
import cn from "classnames";

interface PropsType {
    onClick?: () => void;
    size?: "small" | "large";
    color?: "red" | "green" | "disabled";
    to?: string;
    type: "submit" | "button";
    disabled?: boolean;
}

const Button: React.FC<PropsType> = (props) => {
    const style = cn(classes.button, {
        [classes.small]: props.size === "small",
        [classes.large]: props.size === "large",
        [classes.redButton]: props.color === "red",
        [classes.greenButton]: props.color === "green",
        [classes.grayButton]: !!props.disabled,
    });

    return (
        props.disabled
            ? <button type={"button"} className={style}>{props.children}</button>
            : !!props.to
                ? <Link to={props.to} onClick={props.onClick} className={style}>{props.children}</Link>
                : <button type={props.type} onClick={props.onClick} className={style}>{props.children}</button>

    );
};

export default Button;
