import {VacancyExpendsType} from "../../../types/types";
import {ValuesType} from "./EditVacancy";
//TODO: Сергей Кашкин: Доделать skills с id
export const getInitialValuesForEdit = (vacancy: VacancyExpendsType) => {
    return {
        vacancyName: vacancy.name,
        speciality: vacancy.specialization,
        vacancyDescription: vacancy.description,
        employmentType: vacancy.type_employment,
        schedule: vacancy.work_schedule,
        conditions: vacancy.conditions,
        skills: vacancy.skills as string[],
        requirements: vacancy.requirements,
        responsibilities: vacancy.duties,
        salary: vacancy.salary,
        count: String(vacancy.count),
        additionally: vacancy.additionally
    }
}

export const getDataForSubmit = (values: ValuesType) => {
    return {
        additionally: values.additionally,
        conditions: values.conditions,
        count: Number(values.count),
        description: values.vacancyDescription,
        duties: values.responsibilities,
        free: Number(values.count),
        id: 0,
        author: 1, //TODO: Сергей Кашкин: Доделать
        is_open: true,
        name: values.vacancyName,
        requirements: values.requirements,
        salary: values.salary,
        skills: values.skills,
        specialization: values.speciality,
        type_employment: values.employmentType,
        work_schedule: values.schedule
    }
}