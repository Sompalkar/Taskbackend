import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true } // Adding email field as unique
});

const User = mongoose.model('User', userSchema);

export default User; // Correct export of the model
