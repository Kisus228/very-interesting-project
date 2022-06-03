import {EmployerVacancyExpendsType} from "../../../types/types";

export interface ValuesType {
    vacancyName: string,
    speciality: string,
    vacancyDescription: string,
    employmentType: string,
    schedule: string,
    conditions: string,
    skills: number[],
    requirements: string,
    responsibilities: string,
    salary: string,
    count: string,
    additionally: string,
    id: number
}

export const getInitialValuesForEdit = (vacancy: EmployerVacancyExpendsType) => {
    return {
        vacancyName: vacancy.name,
        speciality: vacancy.specialization,
        vacancyDescription: vacancy.description,
        employmentType: vacancy.type_employment,
        schedule: vacancy.work_schedule,
        conditions: vacancy.conditions,
        skills: vacancy.skills.map(skill => skill.id),
        requirements: vacancy.requirements,
        responsibilities: vacancy.duties,
        salary: vacancy.salary,
        count: String(vacancy.count),
        additionally: vacancy.additionally,
        id: vacancy.id
    }
}

export const getDataForSubmit = (values: ValuesType, author: number) => {
    return {
        additionally: values.additionally,
        conditions: values.conditions,
        count: Number(values.count),
        description: values.vacancyDescription,
        duties: values.responsibilities,
        free: Number(values.count),
        id: values.id,
        author: author,
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
