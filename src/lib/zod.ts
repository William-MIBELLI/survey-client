import z from "zod"

export const signInSchema = z.object({
  email: z.email({ error: "Unvalid Email format address." }),
  password: z.string().nonempty({ error: "Password can't be empty."})
})

export type SignInSchema = z.infer<typeof signInSchema>