import { object, string } from 'yup';

export const registerCustomerSchema = object({
    email: string().email().required(),
    username: string().required(),
    password: string().required()
})
