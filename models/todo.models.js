import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Reference to User model
}, { timestamps: true });

const Todo = mongoose.model('Todo', todoSchema);

export default Todo; // Correct export of the model
