import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { PostRoutes } from '../modules/post/post.route';
import { NotificationRoutes } from '../modules/notification/notification.router';

const router = Router();

const moduleRoutes = [
  
  {
    path: '/user',
    route: UserRoutes
  },
  {
    path: '/post',
    route: PostRoutes
  },
  {
    path: '/notification',
    route: NotificationRoutes
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;