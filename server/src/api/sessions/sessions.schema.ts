import * as z from 'zod';

const sessionSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: "An email is required.",
    }),
    password: z.string({
      required_error: "A password is required.",
    })
  })
});

export default sessionSchema