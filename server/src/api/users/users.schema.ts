import * as z from 'zod';

export const userSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "A name is required.",
    }),
    email: z.string({
      required_error: "An email is required.",
    }).email("Please enter a valid email."),
    password: z.string({
      required_error: "A password is required.",
    }).min(6, "Password must be at least 6 characters long."),
    confirmPassword: z.string({
      required_error: "Please confirm your password.",
    }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  }),
});


export type RegisterUserType = Omit<
  z.TypeOf<typeof userSchema>,
  "body.confirmPassword"
>;
