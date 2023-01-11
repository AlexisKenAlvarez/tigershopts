import { StringMappingType } from "typescript";

export interface productProp {
    id: string,
    image: string,
    name: string,
    desc: string,
    stock: string,
    likes: string[]
}

export interface dataProp {
    id: string,
    org: string,
    products: productProp[]
}

export interface Prod {
    data: dataProp[]
    key: string
}

export interface Status {
    status: boolean,
    data: dataProp[]
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