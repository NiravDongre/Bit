import z from "zod";

export const transcriptValication = z.object({
    Input: z
    .string()
    .trim()
    .length(11, {message: "you don't seems to understand Earth is yours to conquer"})
})

