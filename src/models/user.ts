import { Schema, model, SchemaOptions, Document } from "mongoose";
import { IUser } from "../interfaces/IUser";

const schemaOptions: SchemaOptions = {
    timestamps: true,
};

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, "Please enter a user name"],
            unique: true,
            index: true,
        },

        email: {
            type: String,
            lowercase: true,
            unique: true,
            index: true,
        },

        password: String, // hashed password

        status: String,
    },
    schemaOptions,
);

export default model<IUser & Document>("User", userSchema);
