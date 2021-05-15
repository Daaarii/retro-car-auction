export interface ISignUpData {
    [key: string]: string | File,
    firstName: string
    lastName: string
    nickname: string
    email: string
    password: string
    avatar?: File,
}

export interface ISignInData {
    email: string,
    password: string,
}
