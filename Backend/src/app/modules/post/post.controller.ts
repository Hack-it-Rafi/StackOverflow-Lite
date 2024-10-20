// import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { PostServices } from './post.service';

const createPost = catchAsync(async (req, res) => {
  const result = await PostServices.createPostIntoDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Post is created successfully',
    data: result,
  });
});

const getAllPosts = catchAsync(async (req, res) => {
  const result = await PostServices.getAllPostsFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Posts are retrieved successfully',
    data: result,
  });
});

const getSinglePost = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PostServices.getSinglePostFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Post is retrieved successfully',
    data: result,
  });
});

// const updatePost = catchAsync(async (req, res) => {
//   const { id } = req.params;
//   const result = await PostServices.updatePostInDB(id, req.body);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Post is updated successfully',
//     data: result,
//   });
// });

// const deletePost = catchAsync(async (req, res) => {
//   const { id } = req.params;
//   const result = await PostServices.deletePostFromDB(id);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Post is deleted successfully',
//     data: result,
//   });
// });



export const PostControllers = {
  createPost,
  getSinglePost,
  getAllPosts,
//   updatePost,
//   deletePost,
};