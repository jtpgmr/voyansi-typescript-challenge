import * as z from 'zod';

export const userSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Room name is required.",
    }),
    number: z.number({
      required_error: "Room number is required.",
    }),
    occupant: z.nullable(z.string())
  })
});

// export type CreatePostType = Omit<
//   z.TypeOf<typeof userSchema>,
//   "body.confirmPassword"
// >;