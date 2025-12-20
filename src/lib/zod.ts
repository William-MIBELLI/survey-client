import z from "zod"

export const signInSchema = z.object({
  email: z.email({ error: "Unvalid Email format address." }),
  password: z.string().nonempty({ error: "Password can't be empty."})
})

export type SignInSchema = z.infer<typeof signInSchema>

export const signUpSchema = z.object({
  email: z.email(),
  firstname: z.string().min(2).max(50),
  lastname: z.string().min(2).max(50),
  password: z.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/g),
  confirmPassword: z.string()
})

export type SignupSchema = z.infer<typeof signUpSchema>