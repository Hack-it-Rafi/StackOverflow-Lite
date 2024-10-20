import { model, Schema } from 'mongoose';
import { TNotification } from './notification.interface';

const notificationSchema = new Schema<TNotification>(
  {
    headLine: {
      type: String,
      trim: true,
      required: true,
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Notification = model<TNotification>('Notification', notificationSchema);
