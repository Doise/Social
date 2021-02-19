/* eslint func-names: "off" */
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

        otp: Number,
        otpExpires: Number,

        status: String,
    },
    schemaOptions,
);

userSchema
    .virtual("oneTimePassword")
    .get(function () {
        /**
         * Check expiration.
         */
        if (this.otpExpires > new Date().getTime()) {
            return this.otpExpires;
        }

        /**
         * delete this otp.
         */
        this.set({ otp: null });
        return null;
    })
    .set(function (v: number) {
        /**
         * generate expiration time.
         */
        this.set({ otpExpires: new Date().getTime() + 1_000 * 60 * 5, otp: v });
    });

export default model<IUserBase>("User", userSchema);
