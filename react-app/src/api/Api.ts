import {LoginType, RegisterType} from "../types/types";

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

export const vacancyAPI = {
    async getVacancies(isOpen: boolean) {
        return await fetch(`/authorvacancy${isOpen ? "?is_open=True" : ""}`)
            .then(response => response.json())
            .catch(error => console.error(error))
    },
    async getVacancy(id: number) {
        return await fetch('/authorvacancy/' + id)
            .then(response => response.json())
            .catch(error => console.error(error))
    },
}
// TODO: Сергей Кашкин: Передавать фильтры в запросы