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

export enum PhotoType {
    'user',
    'worker',
    'employer'
}

export interface LoginType {
    username: string;
    password: string;
}

export interface RegisterType extends LoginType {
    email: string;
    firstname: string;
    lastname: string;
    patronymic: string;
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

export interface EmployerVacancyType {
    name: string,
    id: number,
    is_open: boolean,
    count: number,
    free: number,
    count_job_app: number,
}

export interface EmployerVacancyExpendsType extends EmployerVacancyType {
    specialization: string,
    description: string,
    type_employment: string,
    work_schedule: string,
    conditions: string,
    skills: CompetenceType[],
    duties: string,
    requirements: string,
    salary: string,
    additionally: string,
    author: number,
    job_apps: JobAppsType[],
    accepted: string[],
}

export interface WorkerVacancyType {
    name: string,
    free: number,
    id: number,
    skills: string[],
    description: string,
    is_liked: boolean
}

export interface WorkerVacancyExpendsType extends Omit<WorkerVacancyType, "skills"> {
    count: number,
    is_open: boolean,
    salary: string,
    specialization: string,
    type_employment: string,
    work_schedule: string,
    conditions: string,
    duties: string,
    requirements: string,
    additionally: string,
    author: string,
    department: string,
    is_registered: boolean
    skills: CompetenceType[]
}

export type JobAppsType = {
    username: string,
    job_app_id: number,
    resume_id: number
}

export interface UserDataType {
    name: string,
    lastName: string,
    patronymic: string,
    isHeadDepartment: boolean,
    id: number
}

export interface FullUserDataType {
    name: string,
    lastName: string,
    patronymic: string,
    email: string
}

export interface FullWorkerDataType extends FullUserDataType {
    birthDay: string | null,
    specialization: string,
    experience: number,
    skills: CompetenceType[],
    resume: string,
    aboutMe: string,
    vk: string,
    tg: string,
    github: string,
    gitlab: string,
}

export interface FullEmployerDataType extends FullUserDataType {
    department: string,
}

export type UserdataType = {
    first_name: string,
    patronymic: string,
    last_name: string,
    email: string
}

export type WorkerEditDataType = {
    userdata: UserdataType,
    resume: {
        birthday: string,
        about_me: string,
        experience: number,
        github_link: string,
        gitlab_link: string,
        resume_text: string,
        skills: number[],
        specialization: string,
        tg_link: string,
        vk_link: string
    }
}
