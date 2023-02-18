import orgs from "../models/org.model.js";

const addOrg = async (req, res) => {
  const { orgName, orgAddress, hostAddress, hostName } = req.body;
  console.log(req.body);
  try {
    const org = await orgs.findOne({
      orgName: orgName,
    });
    if (org) {
      return res.status(401).json({
        message: "Organization already exists",
      });
    } else {
      const newOrg = new orgs({
        orgName: orgName,
        orgAddress: orgAddress,
        hostAddress: hostAddress,
        members: [
          {
            memberName: hostName,
            memberEthaddress: hostAddress,
            team: "Admin",
          },
        ],
      });
      const saveCheck = await newOrg.save();
      if (saveCheck) {
        return res.status(200).json({
          message: "Organization created successfully",
        });
      } else {
        return res.status(401).json({
          message: "Failed to create organization",
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const getOrg = async (req, res) => {
  const { orgName } = req.body;
  try {
    const org = await orgs.findOne({
      orgName: orgName,
    });
    if (org) {
      return res.status(200).json({
        message: "Organizations fetched successfully",
        org: org,
      });
    } else {
      return res.status(401).json({
        message: "Failed to fetch organizations",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const addMember = async (req, res) => {
  const { orgName, memberEthAddress, memberName } = req.body;
  try {
    const org = await orgs.findOne({
      orgName: orgName,
    });
    if (org) {
      const member = {
        memberEthAddress,
        memberName,
      };
      let newMembers = org.members;
      newMembers.push(member);
      const addMember = await orgs.findOneAndUpdate(
        {
          orgName: orgName,
        },
        {
          members: newMembers,
        }
      );
      if (addMember) {
        res
          .status(200)
          .json({ member: member, message: "Member successfully added" });
      } else {
        res.status(400).json({ error: "Process failed" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Couldn't update organization at this stage. Please try again",
    });
  }
};

export { addOrg, getOrg, addMember };
