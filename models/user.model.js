import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
    }, 
    email: {
        type: String,
        required: false
    },
    signerMessage: {
        type: String,
        required: true
    },
    ethAddress: {
        type: String,
        required: true
    },
    signature: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        required: false
    },
    bio: {
        type: String,
        required: false
    }
}, {
    timestamps: true,
    collection: 'users'
});

export default mongoose.model('User', userSchema);
