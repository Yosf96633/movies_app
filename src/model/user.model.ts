import { Schema, model, models, Document } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  image?:string
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique:true,
    },
    password: {
      type: String,
    },
    image:{
      type:String,
  
    },
  },
  { timestamps: true }
);

export const userModel = models.User || model<IUser>("User", userSchema);
