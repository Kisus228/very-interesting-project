import React from 'react';
import {Field, useField} from "formik";
import './FormControl.css';

interface Props {
    name: string;
    label: string;
    type: "text" | "number";
    placeholder?: string;
}

const FormInput: React.FC<Props> = (props) => {
    const [field, meta] = useField(props);

    return (
        <div>
            <h4>{props.label}</h4>
            <Field className="Input" {...field} {...props}/>
        </div>
    );
};

export default FormInput;