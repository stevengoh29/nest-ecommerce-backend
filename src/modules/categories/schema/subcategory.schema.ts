import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Category } from "./category.schema";

export type SubcategoryDocument = HydratedDocument<Subcategory>;

@Schema({ timestamps: true })
export class Subcategory {
    @Prop({ type: mongoose.SchemaTypes.ObjectId, ref: 'Category', required: true })
    category: Category;

    @Prop({ type: String, required: true, unique: true })
    subcategoryName: string;

    @Prop({ type: String, default: "" })
    subcategoryDescription: string;

    @Prop({ type: String, default: "" })
    subcategoryImage: string;

    @Prop({ type: Boolean, default: false })
    isInactive: boolean;

    @Prop({ type: Boolean, default: false })
    isDeleted: boolean;
}

export const SubcategorySchema = SchemaFactory.createForClass(Subcategory);