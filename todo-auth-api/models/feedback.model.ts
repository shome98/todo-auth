import mongoose, { Schema } from "mongoose";

export interface Ifeedback extends Document{
    adminId:string | Schema.Types.ObjectId;
    userId: string | Schema.Types.ObjectId;
    username: string;
    feedback: string;
}
const feedbackSchema = new Schema<Ifeedback>({
    adminId: { required: true },
    username: {},
    userId: {},
    feedback: { required: true }
}, { timestamps: true });
const Feedback = mongoose.model<Ifeedback>("Feedback", feedbackSchema);
export default Feedback;