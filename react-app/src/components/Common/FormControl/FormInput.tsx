import React from 'react';
import {Field, useField} from "formik";
import './FormControl.css';
import cn from "classnames";

interface Props {
    name: string;
    label: string;
    type: "text" | "number";
    placeholder?: string;
    required?: boolean;
}

const FormInput: React.FC<Props> = (props) => {
    const [field, meta] = useField(props);

    return (
        <div>
            <h4>{props.label}</h4>
            <Field className={cn("Input", {["Error"]: meta.touched && meta.error})} {...field} {...props}/>
            {meta.touched && meta.error ? <div className="ErrorMessage">{meta.error}</div> : null}
        </div>
    );
};

export default FormInput;