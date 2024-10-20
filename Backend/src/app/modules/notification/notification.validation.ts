import { z } from 'zod';

const createNotificationValidationSchema = z.object({
  body: z.object({
    headLine: z.string(),
    postId: z.string(),
    // status: z.enum(['processing', 'finished']).optional(),
  }),
});

export const NotificationValidations = {
  createNotificationValidationSchema,
};
