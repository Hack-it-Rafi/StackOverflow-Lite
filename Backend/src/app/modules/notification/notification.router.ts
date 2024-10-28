import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
// import auth from '../../middlewares/auth';
import { NotificationValidations } from './notification.validation';
import { NotificationControllers } from './notification.controller';

const router = express.Router();

router.post(
  '/create-Notification',
  
  validateRequest(NotificationValidations.createNotificationValidationSchema),
  NotificationControllers.createNotification,
);

router.get('/:id', NotificationControllers.getSingleNotification);

router.patch(
  '/:id',
  validateRequest(NotificationValidations.updateNotificationValidationSchema),
  NotificationControllers.updateNotification,
);

// router.delete('/:id', auth('admin'), NotificationControllers.deleteNotification);


router.get('/', NotificationControllers.getAllNotifications);

export const NotificationRoutes = router;