import {ValuesType} from "./Login";

export const validate = (values: ValuesType) => {
    const errors: Partial<ValuesType> = {};

    if (!values.email) {
        errors.email = 'Заполните поле';
    }

    const email = /\w+@\w+.\w+/
    if (!email.test(values.email)) {
        errors.email = 'Не валидное';
    }

    if (!values.password) {
        errors.password = 'Заполните поле';
    }

    return errors;
};