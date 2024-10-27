// import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { PostServices } from './post.service';
import { uploadToMinIO } from './post.utility';

const createPost = catchAsync(async (req, res) => {
  const { file } = req;
  if (!file) {
    return res.status(400).json({ success: false, message: "File not found" });
  }

  // Upload file to MinIO
  const bucketName = 'stackoverflow-files';

  try {
    await uploadToMinIO(bucketName, file);
    const postData = {
      ...req.body,
      fileUrl: `/${bucketName}/${file.originalname}`, // Store file path in DB if needed
    };
    const result = await PostServices.createPostIntoDB(postData);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Post is created successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "File upload failed" });
  }
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