import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Gender } from "../enum/gender.enum";
import { UserType } from "../enum/user-type.enum";

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
    @Prop({ type: String, required: true })
    username: string;

    @Prop({ type: String, required: true })
    password: string;

    @Prop({ type: String, required: true })
    email: string;

    @Prop({ type: String, required: true })
    phoneNumber: string;

    @Prop({ type: String, required: true })
    phoneCode: string;

    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: String, enum: Object.values(Gender), default: Gender.UNDEFINED })
    gender: Gender;

    @Prop({ type: String, default: "" })
    image: string;

    @Prop({ type: String, default: "" })
    personalKey: string;

    @Prop({ type: String, enum: Object.values(UserType), default: UserType.USER })
    userType: UserType;
}

export const UserSchema = SchemaFactory.createForClass(User);