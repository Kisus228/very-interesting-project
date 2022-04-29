import React, {useState} from 'react';
import classes from './NewVacancy.less';
import Button from "../Common/FormControl/Button";
import {Formik, Form, Field} from "formik";
import {FormSelect} from "../Common/FormControl/FormSelect";
import FormInput from "../Common/FormControl/FormInput";

interface ValuesType {
    vacancyName: string,
    speciality: string,
    department: string,
    vacancyDescription: string,
    employmentType: string,
    schedule: string,
    conditions: string,
    skills: number[],
    requirements: string,
    responsibilities: string,
    salary: string,
    count: string,
    additionally: string
}

const NewVacancy = () => {
    const initialValues = {
        vacancyName: "",
        speciality: "",
        department: "",
        vacancyDescription: "",
        employmentType: "",
        schedule: "",
        conditions: "",
        skills: [],
        requirements: "",
        responsibilities: "",
        salary: "",
        count: "",
        additionally: ""
    }

    const [skills] = useState(
        [
            {value: 0, label: 'JavaScript'},
            {value: 1, label: 'Python'},
        ]
    );

    const [speciality] = useState(
        [
            {value: 0, label: 'Имитатор программиста'},
            {value: 1, label: 'Front-end разработчик'},
        ]
    );

    return (
        <Formik initialValues={initialValues} onSubmit={values => console.log(values)}>
            <Form>
                <h2>История вакансий</h2>
                <div className={classes.NewVacancy}>
                    <section className={classes.VacancySection}>
                        <FormInput label={"Название вакансии"} type="text" name="vacancyName"
                                   placeholder={"Напишите название вакансии"}/>
                        <FormSelect name={"speciality"} label={"Специальность"} options={speciality}
                                    placeholder={"Выберите специальность"}/>
                        <FormInput label={"Департамент"} type="text" name="department"
                                   placeholder={"Напишите название департамента"}/>
                        <FormInput label={"Описание вакансии"} type="text" name="vacancyDescription"
                                   placeholder={"Напишите описание вакансии"}/>
                        <FormInput label={"Тип занятости"} type="text" name="employmentType"
                                   placeholder={"Напишите тип занятости"}/>
                        <FormInput label={"График работы"} type="text" name="schedule"
                                   placeholder={"Напишите график работы"}/>
                        <FormInput label={"Условия"} type="text" name="conditions"
                                   placeholder={"Напишите условия вакансии"}/>
                    </section>
                    <section className={classes.VacancySection}>
                        <FormSelect name={"skills"} label={"Навыки"} options={skills}
                                    placeholder={"Выберите необходимые навыки"} isMulti/>
                        <FormInput label={"Требования"} type="text" name="requirements"
                                   placeholder={"Напишите требования вакансии"}/>
                        <FormInput label={"Обязанности"} type="text" name="responsibilities"
                                   placeholder={"Напишите обязанности сотрудника"}/>
                        <FormInput label={"Заработная плата"} type="text" name="responsibilities"
                                   placeholder={"Напишите сумму заработной платы"}/>
                        <FormInput label={"Количество сотрудников"} type="number" name="count"
                                   placeholder={"Напишите кол-во сотрудников на вакансию"}/>
                        <FormInput label={"Дополнительно"} type="text" name="additionally"
                                   placeholder={"Дополнительная информация"}/>
                        <div className={classes.ButtonWrapper}>
                            <Button type={"submit"} color={"green"}>Опубликовать</Button>
                        </div>
                    </section>
                </div>
            </Form>
        </Formik>

    );
};

export default NewVacancy;