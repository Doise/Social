import { Document } from "mongoose";

export interface IUser extends Document {
    id: string;
    username: string;
    email: string;
    password: string;
    status: string;
}

export interface ICreateUserInput {
    username: IUser["username"];
    email: IUser["email"];
    password: IUser["password"];
}

export interface IUpdateUserInput {
    token: string;
    username?: IUser["username"];
    email?: IUser["email"];
    password?: IUser["password"];
    status?: IUser["status"];
}

export interface ILoginUserInput {
    identity: IUser["email"] | IUser["username"];
    password: IUser["password"];
}

export interface ILoginUserResult {
    user: IUser;
    token: string;
}
