export type FilterType = {
    category: string;
    skills: CompetenceType[];
};

export type CompetenceType = {
    id: number,
    name: string,
}

export type SkillType = {
    value: number,
    label: string,
}

export interface LoginType {
    username: string;
    password: string;
}

export interface RegisterType extends LoginType {
    email: string;
    firstname: string;
    lastname: string;
}

export interface ResumeType {
    name: string,
    id: number,
    is_liked: boolean,
    specialization: string,
    experience: number,
    skills: string[]
}

export interface ResumeExpendsType extends ResumeType {
    desired_vacancies: DesiredVacancyType[],
    tg: string,
    vk: string,
    github: string,
    gitlab: string,
    email: string,
    resume_text: string,
    about_me: string,
    //birthday: string
}

export type DesiredVacancyType = {
    name: string,
    id_vacancy: number,
    id_job_app: number,
}

export interface VacancyType {
    name: string,
    id: number,
    is_open: boolean,
    count: number,
    free: number,
}


export interface VacancyExpendsType extends VacancyType{
    specialization: string,
    description: string,
    type_employment: string,
    work_schedule: string,
    conditions: string,
    skills: number[] | string[],
    duties: string,
    requirements: string,
    salary: string,
    additionally: string,
    author: number,
}
