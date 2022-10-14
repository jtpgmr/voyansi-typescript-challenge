import { Types } from 'mongoose';
import * as z from 'zod';

export const IdParam = z.object({
  id: z.string().length(24).refine((value) => {
    try {
      return new Types.ObjectId(value);
    } catch (error) {
      return false;
    }
  }, 
  // "message" is a Zod property
  {
    message: 'Invalid ObjectId',
  }),
});

export type IdParam = z.infer<typeof IdParam>;