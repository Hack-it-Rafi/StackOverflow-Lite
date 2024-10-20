import { Types } from 'mongoose';

export type TNotification = {
  headLine: string;
  //   status: 'processing' | 'finished';
  postId: Types.ObjectId;
};
