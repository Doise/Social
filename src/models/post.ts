import { Schema, model, SchemaOptions } from "mongoose";
import { IPostBase } from "../interfaces/IPost";

const schemaOptions: SchemaOptions = { timestamps: true };

const postSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },

        body: {
            type: String,
            required: true,
        },

        author: { type: Schema.Types.ObjectId, ref: "User" },

        likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    },
    schemaOptions,
);

export default model<IPostBase>("Post", postSchema);
