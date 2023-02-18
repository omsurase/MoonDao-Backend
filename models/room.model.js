import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    roomId: {
        type: String,
        required: false,
    }, 
    peers: [
        {
            peerId: {
                type: String,
                required: false
            },
            peerName: {
                type: String,
                required: true
            },
            peerEthAddress: {
                type: String,
                required: true
            },
        }
    ]

}, {
    timestamps: true,
    collection: 'rooms'
});

export default mongoose.model('Room', roomSchema);
