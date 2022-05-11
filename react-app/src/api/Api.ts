import {LoginType, RegisterType, EmployerVacancyExpendsType, EmployerVacancyType} from "../types/types";
import Cookies from 'js-cookie';

export const authAPI = {
    async postAuthLogin(data: LoginType) {
        return await fetch(`/login/`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json; charset=utf-8'},
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .catch(error => console.error(error))
    },
    async deleteAuthLogin() {
        return await fetch(`/logout/`)
            .catch(error => console.error(error))
    },
    async postAuthRegister(data: RegisterType) {
        return await fetch(`/registration/`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json; charset=utf-8'},
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .catch(error => console.error(error))
    },
    async getAuthMe() {
        return await fetch('/is_authenticate/')
            .then(response => response.json())
            .catch(error => console.error(error))
    },
}

export const filterAPI = {
    async getFilter() {
        return await fetch('/get_filter/')
            .then(response => response.json())
            .catch(error => console.error(error))
    },
}

export const employerVacancyAPI = {
    async getVacancies(isOpen: boolean) {
        return await fetch(`/authorvacancy${isOpen ? "?is_open=True" : ""}`)
            .then(response => response.json())
            .catch(error => console.error(error))
    },
    async postVacancy(data: EmployerVacancyExpendsType) {
        const csrftoken = Cookies.get("csrftoken") || "";
        return await fetch('/authorvacancy/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json; charset=utf-8', 'X-CSRFToken': csrftoken},
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .catch(error => console.error(error))
    },
    async putVacancy(id: number, data: EmployerVacancyExpendsType) {
        const csrftoken = Cookies.get("csrftoken") || "";
        return await fetch('/authorvacancy/' + id + "/", {
            method: 'PUT',
            headers: {'Content-Type': 'application/json; charset=utf-8', 'X-CSRFToken': csrftoken},
            body: JSON.stringify(data),
        })
            .catch(error => console.error(error))
    },
    async deleteVacancy(id: number, authorId: number) {
        const csrftoken = Cookies.get("csrftoken") || "";
        return await fetch('/authorvacancy/' + id + "/", {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json; charset=utf-8', 'X-CSRFToken': csrftoken},
            body: JSON.stringify({author: authorId})
        })
            .catch(error => console.error(error))
    },
    async getVacancy(id: number) {
        return await fetch('/authorvacancy/' + id)
            .then(response => response.json())
            .catch(error => console.error(error))
    },
}

export const workerVacancyAPI = {
    async getVacancies(skills: number[]) {
        return await fetch(`/vacancy${skills.length ? ("?skills=" + skills.join(",")) : ""}`)
            .then(response => response.json())
            .catch(error => console.error(error))
    },
    async getLikedVacancies() {
        return await fetch('/liked_vacancy/')
            .then(response => response.json())
            .catch(error => console.error(error))
    },
    async getVacancy(id: number) {
        return await fetch('/vacancy/' + id)
            .then(response => response.json())
            .catch(error => console.error(error))
    },
    async likeVacancy(id: number) {
        const csrftoken = Cookies.get("csrftoken") || "";
        return await fetch('/like_vacancy/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json; charset=utf-8', 'X-CSRFToken': csrftoken},
            body: JSON.stringify({id: id}),
        })
            .catch(error => console.error(error))
    },
}

export const resumeAPI = {
    async getResumes(skills: string[]) {
        return await fetch(`/resume${skills.length ? ("?skills=" + skills.join(",")) : ""}`)
            .then(response => response.json())
            .catch(error => console.error(error))
    },
    async getLikedResumes() {
        return await fetch('/liked_resume/')
            .then(response => response.json())
            .catch(error => console.error(error))
    },
    async getResume(id: number) {
        return await fetch('/resume/' + id)
            .then(response => response.json())
            .catch(error => console.error(error))
    },
    async likeResume(id: number) {
        const csrftoken = Cookies.get("csrftoken") || "";
        const data = { id: id }
        return await fetch('/like_resume/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json; charset=utf-8', 'X-CSRFToken': csrftoken},
            body: JSON.stringify(data),
        })
            .catch(error => console.error(error))
    },
}
