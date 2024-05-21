import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CategoryDocument = HydratedDocument<Category>;

@Schema({ timestamps: true })
export class Category {
    @Prop({ type: String, required: true, unique: true })
    categoryName: string;

    @Prop({ type: String, default: "" })
    categoryDescription: string;

    @Prop({ type: String, default: "" })
    categoryImage: string;

    @Prop({ type: Boolean, default: false })
    isInactive: boolean;

    @Prop({ type: Boolean, default: false })
    isDeleted: boolean;
}

export const CategorySchema = SchemaFactory.createForClass(Category);