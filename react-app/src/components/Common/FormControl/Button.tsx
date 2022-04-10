import React from 'react';
import classes from './Button.less';

interface PropsType {
    onClick?: () => void;
    size?: "small" | "large";
    color?: "red";
}

const Button: React.FC<PropsType> = (props) => {
    const small = props.size === "small" && classes.small;
    const large = props.size === "large" && classes.large;
    const color = props.color === "red" && classes.redButton;
    const style = `${classes.button} ${small} ${large} ${color}`;

    return (
        <button onClick={props.onClick} className={style}>{props.children}</button>
    );
};

export default Button;