import Room from "../models/room.model.js";

const addParticipant = async (req, res) => {
  const { roomId, peerId, peerName, peerEthAddress } = req.body;

  const newPeer = {
    peerId,
    peerName,
    peerEthAddress,
  };
  try {
    const room = await Room.findOne({
      roomId: roomId,
    });
    // console.log(room);
    if (room) {
      const peers = room.peers;
      for (let i = 0; i < peers.length; i++) {
        if (peers[i].peerEthAddress === peerEthAddress) {
          peers.splice(i, 1);
          break;
        }
      }
      peers.push(newPeer);
      //   clg
      const updatedRoom = await Room.findOneAndUpdate(
        {
          roomId: roomId,
        },
        {
          peers: peers,
        }
      );
      if (updatedRoom) {
        return res.status(200).json({
          room: updatedRoom,
          message: "Peer added to room successfully",
        });
      } else {
        return res.status(401).json({
          room: room,
          message: "Failed to update room",
        });
      }
    } else {
      const newRoom = new Room({
        roomId: roomId,
        peers: [
          {
            peerId: peerId,
            peerName: peerName,
            peerEthAddress: peerEthAddress,
          },
        ],
      });
      //   newRoom.peers.push(newPeer);
      const saveCheck = await newRoom.save();
      console.log("In new room");
      if (saveCheck) {
        return res
          .status(200)
          .json({ room: newRoom, message: "Room saved successfully" });
      } else {
        return res.status(401).json({
          error: "Failed to save room",
        });
      }
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Couldn't update room at this stage. Please try again" });
  }
};

const getParticipants = async (req, res) => {
  const { roomId } = req.body;
  const room = await Room.findOne({
    roomId: roomId,
  });
  if (room) {
    return res
      .status(200)
      .json({ room: room.peers, message: "Room found successfully" });
  } else {
    return res.status(200).json({
      error: "Room not found",
    });
  }
};

const updatePeerId = async (req, res) => {
  const { roomId, peerId, peerName } = req.body;
  console.log("BODY IS:");
  console.log(req.body);
  const room = await Room.findOne({
    roomId: roomId,
  });
  if (room) {
    const peers = room.peers;
    for (let i = 0; i < peers.length; i++) {
      if (peers[i].peerName === peerName) {
        peers[i].peerId = peerId;
        console.log("updated peer is");
        console.log(peers[i]);
      }
    }
    const updatedRoom = await Room.findOneAndUpdate(
      {
        roomId: roomId,
      },
      {
        peers: peers,
      }
    );
    if (updatedRoom) {
      return res.status(200).json({
        room: updatedRoom,
        message: "Peer updated in room successfully",
      });
    } else {
      return res.status(401).json({
        room: room,
        message: "Failed to update room",
      });
    }
  } else {
    return res.status(401).json({
      error: "Room not found",
    });
  }
};

const removeParticipant = async (req, res) => {
  const { roomId, ethAddress } = req.body;
  const room = await Room.findOne({
    roomId: roomId,
  });
  if (room) {
    const peers = room.peers;
    if (peers.length === 1) {
      console.log('deleteing room');
      const deletedRoom = await Room.findOneAndDelete({
        roomId: roomId,
      });
      if (deletedRoom) {
        return res.status(200).json({
          room: deletedRoom,
          message: "Room deleted successfully",
        });
      } else {
        return res.status(401).json({
          room: room,
          message: "Failed to delete room",
        });
      }
    }
    for (let i = 0; i < peers.length; i++) {
      if (peers[i].peerEthAddress === ethAddress) {
        peers.splice(i, 1);
      }
    }
    const updatedRoom = await Room.findOneAndUpdate(
      {
        roomId: roomId,
      },
      {
        peers: peers,
      }
    );
    if (updatedRoom) {
      return res.status(200).json({
        room: updatedRoom,
        message: "Peer removed from room successfully",
      });
    } else {
      return res.status(401).json({
        room: room,
        message: "Failed to update room",
      });
    }
  } else {
    return res.status(401).json({
      error: "Room not found",
    });
  }
};

export { addParticipant, getParticipants, updatePeerId, removeParticipant };
