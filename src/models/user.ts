import * as z from "zod";

export const userType = z.object({
  username: z.string(),
  secretKey: z.string(),
});

export interface User extends z.infer<typeof userType> {}
