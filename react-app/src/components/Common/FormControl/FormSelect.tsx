import {Field, FieldProps} from "formik";
import React from "react";
import Select, {Options, OnChangeValue} from "react-select";
import './FormControl.css';
import {CompetenceType, SkillType} from "../../../types/types";

interface SelectProps {
    name: string;
    label: string;
    options: Options<SkillType>;
    defaultValue: string[];
    isMulti?: boolean;
    placeholder?: string;
}

interface FormikSelectProps extends FieldProps, SelectProps {
}


const CustomSelect: React.FC<FormikSelectProps> = (props) => {
    const onChange = (option: OnChangeValue<SkillType | SkillType[], boolean>) => {
        props.form.setFieldValue(
            props.field.name,
            props.isMulti
                ? (option as SkillType[]).map((item: SkillType) => item.value)
                : (option as SkillType).value
        );
    };

    const getValue = () => {
        if (props.options) {
            return props.isMulti
                ? props.options.filter(option => props.defaultValue.includes(option.label))
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
            defaultValue={getValue()}
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
