import { StringMappingType } from "typescript";

export interface Status {
    status: boolean,
}

export interface Inputs {
    inputs: {
        id: number,
        name: string,
        label: string,
        type: string
    }[],
    page2inputs: {
        id: number,
        placeholder: string,
        name: string,
        label: string,
        type: string
    }[],
    page3half: {
        id: number,
        name: string,
        label: string,
        type: string
    }[],
    page3full: {
        id: number,
        name: string,
        label: string,
        type: string
    }[],

}

export interface InputVal {
    id: number,
    name: string,
    label: string,
    type: string
}

export interface LoginValues {
    email: string,
    password: string

}

export interface Values {
    email: string,
    username: string,
    fullname: string,
    facebook: string,
    phone: string,
    studentno: string,
    course: string,
    yearsection: string,
    password: string,
    confirmpassword: string,
    verified: boolean
}

export interface Users {
    email: string,
    username: string,
    fullname: string,
    facebook: string,
    phone: string,
    studentno: string,
    course: string,
    yearsection: string,
    password: string,
    verified: boolean
}

export interface VerifyQuery {
    verified: boolean
}