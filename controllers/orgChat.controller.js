import orgs from "../models/org.model.js";

const addChat = async (req, res) => {
  const { orgAddress, senderEthAddress, message } = req.body;
  try {
    const org = await orgs.findOne({
      orgAddress: orgAddress,
    });
    if (org) {
      const newChat = {
        peerId: senderEthAddress,
        message: message,
      };
      const chats = org.chats;
      chats.push(newChat);
      const updatedOrg = await orgs.findOneAndUpdate(
        {
          orgAddress: orgAddress,
        },
        {
          chats: chats,
        }
      );
      if (updatedOrg) {
        return res.status(200).json({
          org: updatedOrg,
          message: "Chat added successfully",
        });
      }
    } else {
      return res.status(401).json({
        message: "Organization does not exist",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const getChats = async (req, res) => {
    const { orgAddress } = req.body;
    try {
        const org = await orgs.findOne({
        orgAddress: orgAddress,
        });
        if (org) {
        return res.status(200).json({
            chats: org.chats,
            message: "Chats fetched successfully",
        });
        } else {
        return res.status(401).json({
            message: "Organization does not exist",
        });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
        message: "Internal Server Error",
        });
    }
}

export { addChat, getChats };