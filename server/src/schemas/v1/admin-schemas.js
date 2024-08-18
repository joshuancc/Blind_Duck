import { object, string } from 'yup';

export const registerAdminSchema = object({
    email: string().email().required(),
    username: string().required(),
    password: string().required()
})

export const loginAdminSchema = object({
    email: string().required(),
    password: string().required()
})
