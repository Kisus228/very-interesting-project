import React from 'react';
import classes from "./NewVacancy.less";
import {Form, Formik} from "formik";
import FormInput from "../../Common/FormControl/FormInput";
import {FormSelect} from "../../Common/FormControl/FormSelect";
import Button from "../../Common/FormControl/Button";
import {ValuesType} from "./EditVacancy";
import {SkillType} from "../../../types/types";

interface Props {
    onSubmit: (values: ValuesType) => void
    initialValues: ValuesType
    editForm: boolean
    skills: SkillType[]
}

const VacancyForm: React.FC<Props> = (props) => {
    return (
        <div className={classes.PageContentWrapper}>
            <div className={classes.PageContainer}>
                <Formik initialValues={props.initialValues} onSubmit={props.onSubmit}>
                    <Form>
                        <h2>{props.editForm ? "Редактирование вакансии" : "Новая вакансия"}</h2>
                        <div className={classes.NewVacancy}>
                            <section className={classes.VacancySection}>
                                <FormInput label={"Название вакансии"} type="text" name="vacancyName"
                                           placeholder={"Напишите название вакансии"}/>
                                <FormInput label={"Специальность"} type={"text"} name={"speciality"}
                                           placeholder={"Выберите специальность"}/>
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
                                <FormSelect name={"skills"} label={"Навыки"} defaultValue={props.initialValues.skills}
                                            options={props.skills} placeholder={"Выберите необходимые навыки"} isMulti/>
                                <FormInput label={"Требования"} type="text" name="requirements"
                                           placeholder={"Напишите требования вакансии"}/>
                                <FormInput label={"Обязанности"} type="text" name="responsibilities"
                                           placeholder={"Напишите обязанности сотрудника"}/>
                                <FormInput label={"Заработная плата"} type="text" name="salary"
                                           placeholder={"Напишите сумму заработной платы"}/>
                                <FormInput label={"Количество сотрудников"} type="number" name="count"
                                           placeholder={"Напишите кол-во сотрудников на вакансию"}/>
                                <FormInput label={"Дополнительно"} type="text" name="additionally"
                                           placeholder={"Дополнительная информация"}/>
                                <div className={classes.ButtonWrapper}>
                                    <Button type={"submit"} color={"green"}>
                                        {props.editForm ? "Сохранить" : "Опубликовать"}
                                    </Button>
                                </div>
                            </section>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default VacancyForm;