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

export type VacancyType = {
    name: string,
    id: number,
    author: string,
    count: number,
    free: number,
    skills: string[],
    description: string,
    is_open: boolean
}

export type ResumeType = {
    name: string,
    id: number,
    is_liked: boolean,
    specialization: string,
    experience: number,
    skills: string[]
}

export type ResumeExpendsType = {
    name: string,
    id: number,
    is_liked: boolean,
    specialization: string,
    experience: number,
    skills: string[]
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
