import {useField} from "formik";
import React from "react";
import './FormControl.css';

interface Props {
    name: string;
    label: string;
    placeholder?: string;
    required?: boolean;
}

export const FormTextarea: React.FC<Props> = (props) => {
    const [field, meta] = useField(props);

    return (
        <div>
            <h4>{props.label}</h4>
            <textarea rows={1} className="Textarea" {...field} {...props}/>
            {meta.touched && meta.error ? <div className="ErrorMessage">{meta.error}</div> : null}
        </div>
    );
}
