import QueryBuilder from '../../builder/QueryBuilder';
import { PostSearchableFields } from './post.constant';
import { TPost } from './post.interface';
import { Post } from './post.model';


const createPostIntoDB = async (payload: TPost) => {
  const result = await Post.create(payload);
  return result;
};

const getAllPostsFromDB = async (query: Record<string, unknown>) => {
  const postQuery = new QueryBuilder(
    Post.find()
      .populate('userId'),
    query,
  )
    .search(PostSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await postQuery.modelQuery;
  return result;
};

const getSinglePostFromDB = async (id: string) => {
  const result = await Post.findById(id).populate('userId');
  return result;
};

// const updatePostInDB = async (id: string, payload: Partial<TPost>) => {
//   const result = await Post.findByIdAndUpdate(id, payload, {
//     new: true,
//     runValidators: true,
//   });
//   return result;
// };

// const deletePostFromDB = async (id: string) => {
//   const result = await Post.findByIdAndDelete(id);
//   return result;
// };

export const PostServices = {
  createPostIntoDB,
  getAllPostsFromDB,
  getSinglePostFromDB,
//   updatePostInDB,
//   deletePostFromDB,
};
