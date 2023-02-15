import mongoose from "mongoose";

const orgSchema = new mongoose.Schema({
  orgName: {
    type: String,
    required: true,
  },
  orgAddress: {
    type: String,
    required: true,
    default: "",
  },
  hostAddress: {
    type: String,
    required: false,
    default: "",
  },
  teams: [Object],
  members: [Object],
  logo: {
    type: String,
    required: false,
    default:
      "https://socialimpact.com/wp-content/uploads/2021/03/logo-placeholder.jpg",
  },
  access_token: {
    type: String,
    required: false,
    default: "",
  },
  chats: [{
    peerId: String,
    displayName: String,
    message: String,
  }],
  meet_recordings: [Object],
}, {
    timestamps: true,
    collection: 'organizations'
});

export default mongoose.model('Org', orgSchema);
