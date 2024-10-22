import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { PostControllers } from './post.controller';
import { PostValidations } from './post.validation';

const router = express.Router();

router.post(
  '/create-Post',
  auth(),
  validateRequest(PostValidations.createPostValidationSchema),
  PostControllers.createPost,
);

router.get('/:id', auth(), PostControllers.getSinglePost);

// router.patch(
//   '/:id',
//   auth('admin', 'editor'),
//   validateRequest(PostValidations.updatePostValidationSchema),
//   PostControllers.updatePost,
// );

// router.delete('/:id', auth('admin'), PostControllers.deletePost);


router.get('/', auth(), PostControllers.getAllPosts);

export const PostRoutes = router;