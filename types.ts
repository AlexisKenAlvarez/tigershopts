import { StringMappingType } from "typescript";

export interface orderType {
    email: string,
    org: string,
}



export interface productProp {
    id: string,
    image: string,
    name: string,
    desc: string,
    stock: string,
    price: string,
    likes: string[]
}

export interface dataProp {
    id: string,
    org: string,
    products: productProp[]
}

export interface Prod {
    key: string,
    email: string,
}

export interface Status {
    status: boolean,
    data: dataProp[],
    email: string,
    user: Users

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
    verified: boolean,
    likes: string[]
}

export interface VerifyQuery {
    verified: boolean
}

export interface Orders {
    user: Users,
    result: productProp,
    id: string,
    status: boolean,
    org: string
}