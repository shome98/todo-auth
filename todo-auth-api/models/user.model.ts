import mongoose, { Schema } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  refreshToken:string
}
const userSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    refreshToken:{type:String}
}, { timestamps: true });
const User = mongoose.model<IUser>("User", userSchema);
export default User;