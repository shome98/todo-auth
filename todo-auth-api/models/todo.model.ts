import mongoose, { Schema } from "mongoose";

export interface ITodo extends Document {
    userId: string | Schema.Types.ObjectId;
    title: string;
    description: string;
    completed: boolean;
}
const todoSchema = new Schema<ITodo>({
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    title: { type: String, required: true },
    description: { type: String},
    completed: { type: Boolean, default: false },
}, { timestamps: true });
const Todo = mongoose.model<ITodo>("Todo", todoSchema);
export default Todo;