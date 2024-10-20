import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { NotificationValidations } from './notification.validation';
import { NotificationControllers } from './notification.controller';

const router = express.Router();

router.post(
  '/create-Notification',
  auth('admin'),
  validateRequest(NotificationValidations.createNotificationValidationSchema),
  NotificationControllers.createNotification,
);

router.get('/:id', auth('admin', 'editor'), NotificationControllers.getSingleNotification);

// router.patch(
//   '/:id',
//   auth('admin', 'editor'),
//   validateRequest(NotificationValidations.updateNotificationValidationSchema),
//   NotificationControllers.updateNotification,
// );

// router.delete('/:id', auth('admin'), NotificationControllers.deleteNotification);


router.get('/', auth('admin', 'editor'), NotificationControllers.getAllNotifications);

export const NotificationRoutes = router;