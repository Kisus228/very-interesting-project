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
    author: string,
    count: number,
    free: number,
    skills: string[],
    description: string,
    is_open: boolean
}
