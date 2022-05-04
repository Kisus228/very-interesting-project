import React, {InputHTMLAttributes, useState} from "react";
import {useField} from "formik";
import classes from "./Auth.less";
import cn from "classnames";
import {CloseEye, OpenEye} from "../Common/Icons/Icons";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
}

export const Input: React.FC<InputProps> = (props) => {
    const [field, meta] = useField(props);

    return (
        <div className={classes.InputWrapper}>
            <label className={classes.Label}>{props.label}</label>
            <div className={classes.InputArea}>
                <input
                    className={cn(classes.Input, {
                        [classes.Error]: meta.touched && meta.error
                    })}
                    {...field}
                    {...props}
                />
            </div>
            {meta.touched && meta.error ? <div className={classes.ErrorMessage}>{meta.error}</div> : null}
        </div>
    );
}

export const PassInput: React.FC<InputProps> = (props) => {
    const [field, meta] = useField(props);
    const [visible, setVisible] = useState(false);

    return (
        <div className={classes.InputWrapper}>
            <label className={classes.Label}>{props.label}</label>
            <div className={classes.InputArea}>
                <input
                    className={cn(classes.Input, {
                        [classes.Error]: meta.touched && meta.error
                    })}
                    type={visible ? "text" : "password"}
                    {...field}
                    {...props}
                />
                <div className={classes.Eye}>
                    {
                        visible
                            ? <CloseEye onClick={() => setVisible(false)}/>
                            : <OpenEye onClick={() => setVisible(true)}/>
                    }
                </div>
            </div>
            {meta.touched && meta.error ? <div className={classes.ErrorMessage}>{meta.error}</div> : null}
        </div>
    );
}