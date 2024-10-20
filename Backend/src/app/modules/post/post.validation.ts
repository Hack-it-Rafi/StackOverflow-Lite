import { z } from 'zod';

const createPostValidationSchema = z.object({
  body: z.object({
    headLine: z.string(),
    content: z.string(),
    userMail: z.string(),
    supplierId: z.string(),
    // status: z.enum(['processing', 'finished']).optional(),
  }),
});

export const PostValidations = {
  createPostValidationSchema,
};
