import React from 'react';
import classes from './Button.less';

interface PropsType {

}

const Button: React.FC<PropsType> = (props) => {
    return (
        <button className={classes.button}>{props.children}</button>
    );
};

export default Button;