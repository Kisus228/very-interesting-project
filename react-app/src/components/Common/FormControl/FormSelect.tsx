import {Field, FieldProps} from "formik";
import React, {useState} from "react";
import Select, {OnChangeValue, Options} from "react-select";
import './FormControl.css';
import {SkillType} from "../../../types/types";

interface SelectProps {
    name: string;
    label: string;
    options: Options<SkillType>;
    defaultValue: number[];
    isMulti?: boolean;
    placeholder?: string;
    required?: boolean;
}

interface FormikSelectProps extends FieldProps, SelectProps {
}


const CustomSelect: React.FC<FormikSelectProps> = (props) => {
    const getValue = () => {
        if (props.options) {
            return props.isMulti
                ? props.options.filter(option => props.defaultValue.includes(option.value))
                : props.options.find(option => option.value === props.field.value);
        } else {
            return props.isMulti ? [] : ("" as any);
        }
    };

    const [value, setValue] = useState(getValue())

    const onChange = (option: OnChangeValue<SkillType | SkillType[], boolean>) => {
        const value = props.isMulti
            ? (option as SkillType[]).map((item: SkillType) => item.value)
            : (option as SkillType).value

        props.form.setFieldValue(props.field.name, value);
        setValue(value)
    };

    return (
        <>
            <Select
                className="Select"
                classNamePrefix="React-select"
                name={props.field.name}
                defaultValue={getValue()}
                onChange={onChange}
                options={props.options}
                placeholder={props.placeholder}
                isMulti={props.isMulti}
            />
            <input
                tabIndex={-1}
                autoComplete="off"
                onChange={() => {
                }}
                value={value}
                style={{opacity: 0, height: 0}}
                required={props.required}
            />
        </>
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
