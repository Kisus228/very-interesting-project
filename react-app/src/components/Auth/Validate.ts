import {LoginType, RegisterType} from "../../types/types";
import {RegisterTypeWithRetryPass} from "./Register";

const email = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;

export const validateLogin = (values: LoginType) => {
    const errors: Partial<LoginType> = {};

    if (!values.username) {
        errors.username = 'Заполните поле';
    }

    if (!values.password) {
        errors.password = 'Заполните поле';
    } else if (values.password.length < 5) {
        errors.password = 'Слишком короткий';
    }

    return errors;
};

export const validateRegister = (values: RegisterTypeWithRetryPass) => {
    const errors: Partial<RegisterTypeWithRetryPass> = {};

    if (!values.email) {
        errors.email = 'Заполните поле';
    } else if (!email.test(values.email)) {
        errors.email = 'Не валидное';
    }

    if (!values.username) {
        errors.username = 'Заполните поле';
    }

    if (!values.firstname) {
        errors.firstname = 'Заполните поле';
    }

    if (!values.lastname) {
        errors.lastname = 'Заполните поле';
    }

    if (!values.password) {
        errors.password = 'Заполните поле';
    } else if (values.password.length < 5) {
        errors.password = 'Слишком короткий';
    }

    if (!values.retryPassword) {
        errors.retryPassword = 'Заполните поле';
    } else if (values.retryPassword !== values.password) {
        errors.retryPassword = 'Пароли не совпадают';
    }

    return errors;
};