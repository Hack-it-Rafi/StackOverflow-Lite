// import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { PostServices } from './post.service';
import { getObjectFromMinIO, uploadToMinIO } from './post.utility';


const bucketName = 'stackoverflow-files';


const createPost = catchAsync(async (req, res) => {
  const { file } = req;
  if (!file) {
    return res.status(400).json({ success: false, message: "File not found" });
  }

  // Upload file to MinIO
  

  try {
    await uploadToMinIO(bucketName, file);
    const postData = {
      ...req.body,
      fileUrl: `/${bucketName}/${file.originalname}`, 
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

const getPostFile = catchAsync(async (req, res) => {
  
  const { fileName } = req.params;
  try {
      const content = await getObjectFromMinIO(bucketName, fileName);
      res.status(200).json({ filename: fileName, content: content });
  } catch (error) {
      res.status(500).json({ message: "Could not retrieve file.", error: error.message });
  }
});

export const PostControllers = {
  createPost,
  getSinglePost,
  getAllPosts,
  getPostFile
};