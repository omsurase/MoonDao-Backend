import Orgs from "../models/org.model.js";

const encryptFile = async (req, res) => {
  const { type, cid, name, orgAddress } = req.body;
  console.log(req.body);
  try {
    const org = await Orgs.findOne({
      orgAddress: orgAddress,
    });
    if (org) {
      const file = {
        type,
        name,
        cid,
        date: new Date(),
      };
      org.files.push(file);
      const check = await org.save();
      if (check) {
        return res.status(200).json({ message: "file encrypted successfully" });
      }
    } else {
      return res.status(400).json({
        error: "No org found",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const showFiles = async (req, res) => {
  const { orgAddress } = req.body;
  console.log(orgAddress);
  try {
    const org = await Orgs.findOne({
      orgAddress: orgAddress,
    });
    if (org)
      return res.status(200).json({
        files: org.files,
      });
    else {
      console.log("no orgs found");
      return res.status(400).json({
        error: "No org found",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export { encryptFile, showFiles };
