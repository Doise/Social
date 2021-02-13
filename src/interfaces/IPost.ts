import { Document, ObjectId } from "mongoose";
import { IUser } from "./IUser";

export interface IPostBase extends Document {
    title: string;
    body: string;
    author: ObjectId;
    likes: ObjectId[];
}

export interface IPost {
    id: IPostBase["_id"];
    title: IPostBase["title"];
    body: IPostBase["body"];
    author: IUser;
    likes: IUser[];
}

export interface ICreatePostInput {
    title: IPostBase["title"];
    body: IPostBase["body"];
    author: ObjectId;
    likes?: ObjectId[];
}

export interface IToggleLikeInput {
    userId: ObjectId;
    postId: ObjectId;
}