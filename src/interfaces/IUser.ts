import { Document } from "mongoose";

export interface IUserBase extends Document {
    username: string;
    email: string;
    password: string;
    status: string;
    oneTimePassword?: number;
}

export interface IUser {
    id?: IUserBase["_id"]
    username: IUserBase["username"];
    email: IUserBase["email"];
    status: IUserBase["status"];
}

export interface ICreateUserInput {
    username: IUserBase["username"];
    email: IUserBase["email"];
    password: IUserBase["password"];
    status?: IUserBase["status"];
}

export interface IUpdateUserInput {
    token: string;
    username?: IUserBase["username"];
    email?: IUserBase["email"];
    password?: IUserBase["password"];
    status?: IUserBase["status"];
}

export interface ILoginUserInput {
    identity: IUserBase["email"] | IUserBase["username"];
    password: IUserBase["password"];
}

export interface IUserResult {
    user: IUser;
    token: string;
}
