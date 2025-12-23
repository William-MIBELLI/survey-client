import z from "zod";

export const signInSchema = z.object({
  email: z.email({ error: "Unvalid Email format address." }),
  password: z.string().nonempty({ error: "Password can't be empty." }),
});

export type SignInSchema = z.infer<typeof signInSchema>;

export const signUpSchema = z
  .object({
    email: z.email(),
    firstname: z.string().min(2).max(50),
    lastname: z.string().min(2).max(50),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter.",
      })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter.",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number." })
      .regex(/[@$!%*?&]/, {
        message: "Password must contain at least one special character.",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password and confirmation have to match.",
  });

export type SignupSchema = z.infer<typeof signUpSchema>;

export const askResetPassword = z.object({
  email: z.email(),
});

export type TAskResetPassword = z.infer<typeof askResetPassword>;

export const resetPasswordSchema = signUpSchema
  .pick({
    email: true,
    password: true,
    confirmPassword: true,
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password and confirmation have to match.",
  });

export type TResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

export const createSurveySchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(10).max(255),
  isPublic: z.boolean(),
  startDate: z.iso.date({ message: "The date is not valid"}).optional(),
  endDate: z.iso.date({ message: "The date is not valid"}).optional()
})

export type TCreateSurveySchema = z.infer<typeof createSurveySchema>
