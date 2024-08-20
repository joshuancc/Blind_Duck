import { object, string } from 'yup';

export const registerCustomerSchema = object({
    email: string().email().required(),
    username: string().required(),
    password: string().required()
})


export const loginCustomerSchema = object({
    email: string().email().required(),
    password: string().required()
})
