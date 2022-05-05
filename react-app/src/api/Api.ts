import {LoginType, RegisterType} from "../types/types";

export const authAPI = {
    async postAuthLogin(data: LoginType) {
        return await fetch(`/login/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
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
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .catch(error => console.error(error))
    }
    /*async getAuthMe() {
        return await fetch('/account/user/')
            .then(response => response.json())
            .then(data => data)
            .catch(error => console.error(error))
    },
    */
}

export const filterAPI = {
    async getFilter() {
        return await fetch('/get_filter/')
            .then(response => response.json())
            .catch(error => console.error(error))
    },
}

export const vacancyAPI = {
    async getVacancy() {
        return await fetch('/vacancy/')
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(error => console.error(error))
    },
}