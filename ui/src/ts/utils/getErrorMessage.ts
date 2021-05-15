export enum Validations {
    isEmpty = 'isEmpty',
    minLenth = 'minLenth',
    maxLength = 'maxLength',
    isEmail = 'isEmail',
    isPassword = 'isPassword',
}

export const getErrorMessage = (validation: Validations, constraint?: number) => {
    switch (validation) {
        case Validations.isEmpty:
            return 'Поле не может быть пустым'
        case Validations.minLenth:
            return `Количество символов не может быть меньше ${constraint}`
        case Validations.maxLength:
            return `Количество символов не может быть более ${constraint}`
        case Validations.isEmail:
            return `Email введен некорректно`
        case Validations.isPassword:
            return `Пароль должен содержать хотя бы 1 заглавную букву и 1 цифру`
    }
}
