import {Field, FieldProps} from "formik";
import React from "react";
import Select, {Options, OnChangeValue} from "react-select";
import './FormControl.css';

interface Option {
    label: string;
    value: number;
}

interface SelectProps {
    name: string;
    label: string;
    options: Options<Option>;
    isMulti?: boolean;
    placeholder?: string;
}

interface FormikSelectProps extends FieldProps, SelectProps {
}


const CustomSelect: React.FC<FormikSelectProps> = (props) => {
    const onChange = (option: OnChangeValue<Option | Option[], boolean>) => {
        props.form.setFieldValue(
            props.field.name,
            props.isMulti
                ? (option as Option[]).map((item: Option) => item.value)
                : (option as Option).value
        );
    };

    const getValue = () => {
        if (props.options) {
            return props.isMulti
                ? props.options.filter(option => props.field.value.indexOf(option.value) >= 0)
                : props.options.find(option => option.value === props.field.value);
        } else {
            return props.isMulti ? [] : ("" as any);
        }
    };

    return (
        <Select
            className="Select"
            classNamePrefix="React-select"
            name={props.field.name}
            value={getValue()}
            onChange={onChange}
            options={props.options}
            placeholder={props.placeholder}
            isMulti={props.isMulti}
        />
    );
};

export const FormSelect: React.FC<SelectProps> = (props) => {
    return (
        <div>
            <h4>{props.label}</h4>
            <Field component={CustomSelect} {...props}/>
        </div>
    );
}
