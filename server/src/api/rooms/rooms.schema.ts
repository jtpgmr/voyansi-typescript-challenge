import * as z from 'zod';
import { TypeOf } from 'zod';

const roomSchema = z.object({
    name: z.string(),
    number: z.number(),
    occupant: z.undefined(z.string())
});

export default roomSchema


export const updateRoomOccupantSchema = z.object({
    occupant: z.string()
})