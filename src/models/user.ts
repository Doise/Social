import { Schema, model, SchemaOptions } from "mongoose";
import { IUserBase } from "../interfaces/IUser";

const schemaOptions: SchemaOptions = { timestamps: true };

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },

        password: {
            type: String,
            required: true,
        },

        status: String,
    },
    schemaOptions,
);

export default model<IUserBase>("User", userSchema);
