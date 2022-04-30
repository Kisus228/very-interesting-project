import {LoginType} from "./Login";
import {RegisterType} from "./Register";

export const validateLogin = (values: LoginType) => {
    const errors: Partial<LoginType> = {};

    if (!values.email) {
        errors.email = 'Заполните поле';
    }

    const email = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
    if (!email.test(values.email)) {
        errors.email = 'Не валидное';
    }

    if (!values.password) {
        errors.password = 'Заполните поле';
    }

    if (values.password.length < 5) {
        errors.password = 'Слишком короткий';
    }

    return errors;
};

export const validateRegister = (values: RegisterType) => {
    const errors: Partial<RegisterType> = {};

    if (!values.email) {
        errors.email = 'Заполните поле';
    }

    const email = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
    if (!email.test(values.email)) {
        errors.email = 'Не валидное';
    }

    if (!values.password) {
        errors.password = 'Заполните поле';
    }

    if (values.password.length < 5) {
        errors.password = 'Слишком короткий';
    }

    if (!values.retryPassword) {
        errors.retryPassword = 'Заполните поле';
    }

    if (values.retryPassword !== values.password) {
        errors.retryPassword = 'Пароли не совпадают';
    }

    return errors;
};