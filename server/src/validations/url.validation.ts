import z from "zod";

export const transcriptValication = z.object({
    Input: z
    .string()
    .trim()
})

