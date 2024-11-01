import mongoose, { Schema } from "mongoose";

export interface Ifeedback extends Document{
    adminId:string | Schema.Types.ObjectId;
    userId: string | Schema.Types.ObjectId;
    username: string;
    feedback: string;
}
const feedbackSchema = new Schema<Ifeedback>({
    adminId: { type:Schema.Types.ObjectId,required: true, ref:"User"},
    username: {type:String},
    userId: {type:Schema.Types.ObjectId,ref:"User"},
    feedback: { type:String,required: true }
}, { timestamps: true });
const Feedback = mongoose.model<Ifeedback>("Feedback", feedbackSchema);
export default Feedback;