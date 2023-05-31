import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    required: true,
    type: String
  },
  password: {
    required: true,
    type: String
  }
});

const userModel = mongoose.model('user', userSchema);

export default userModel;
