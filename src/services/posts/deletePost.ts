import { ObjectId } from "mongoose";
import { IPost } from "../../interfaces/IPost";
import Post from "../../models/post";

export default async (postId: ObjectId): Promise<IPost> => {
    const post = await Post.findByIdAndDelete(postId);
    return (post as unknown) as IPost;
};
