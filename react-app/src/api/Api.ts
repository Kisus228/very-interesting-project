//import Cookies from 'js-cookie';

/*export const authAPI = {
    async postAuthLogin(data) {
        const csrftoken = Cookies.get('csrftoken');
        return await fetch(`/account/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify(data),
        }).then(response => response.json())
            .then(data => data)
            .catch(error => console.error(error))
    },
    async deleteAuthLogin() {
        return await fetch(`/account/logout/`)
            .then(response => response.text())
            .then(data => data)
            .catch(error => console.error(error))
    },
    async getAuthMe() {
        return await fetch('/account/user/')
            .then(response => response.json())
            .then(data => data)
            .catch(error => console.error(error))
    },
    async getCsrf() {
        return await fetch('/account/get_csrf/')
            .then(response => response.text())
            .then(data => data)
            .catch(error => console.error(error))
    },
    async postAuthRegister(data) {
        const csrftoken = Cookies.get('csrftoken');
        return await fetch(`/account/registration/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify(data),
        }).then(response => response.json())
            .then(data => data)
            .catch(error => console.error(error))
    },
    async postTelegram(data) {
        const csrftoken = Cookies.get('csrftoken');
        return await fetch(`/account/add_tg_user/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify(data),
        }).then(response => response.json())
            .then(data => data)
            .catch(error => console.error(error))
    },
}*/

export const filterAPI = {
    async getFilter() {
        return await fetch('/get_filter/')
            .then(response => response.json())
            .then(data => data)
            .catch(error => console.error(error))
    },
}