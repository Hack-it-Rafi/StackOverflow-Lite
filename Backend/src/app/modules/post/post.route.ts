import express from 'express';
import multer from 'multer';
import validateRequest from '../../middlewares/validateRequest';
import { PostControllers } from './post.controller';
import { PostValidations } from './post.validation';

const router = express.Router();

// Use memory storage to avoid saving the file permanently
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
  '/create-Post',
  upload.single('file'), // Specify the field name to be 'file'
  validateRequest(PostValidations.createPostValidationSchema),
  PostControllers.createPost,
);

router.get('/:id', PostControllers.getSinglePost);
router.get('/', PostControllers.getAllPosts);
router.get('/file/:fileName', PostControllers.getPostFile);

export const PostRoutes = router;
