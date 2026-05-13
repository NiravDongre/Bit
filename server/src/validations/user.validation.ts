import z from "zod";

export const SignupValidation = z.object({
    username: z
    .string()
    .trim()
    .min(2, {message: "2 letters are minimum"})
    .max(30, {message: "30 characters max"}),

    email: z
    .email({message: "email is required"})
    .trim()
    .max(100, {message: "email must be under 100 characters"}),

    password: z
    .string()
    .trim()
    .min(6, {message: "minimum 6 letters required"})
    .max(20, {message: "Only up to 20 letters"})
    .regex(/[A-Z]/, {message: "One Capital letter required"})
})


export const SigninValidation = z.object({
    username: z
    .string()
    .trim()
    .min(2, {message: "2 letters are minimum"})
    .max(30, {message: "30 characters max"}),

    password: z
    .string()
    .trim()
    .min(6, {message: "minimum 6 letters required"})
    .max(20, {message: "Only up to 20 letters"})
    .regex(/[A-Z]/, {message: "One Capital letter required"})
})