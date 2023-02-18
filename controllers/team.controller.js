import orgs from "../models/org.model.js";

const addTeam = async (req, res) => {
  const { orgAddress, teamName, task, myAddress, myName } = req.body;
  const newTeam = {
    teamName: teamName,
    members: [
      {
        memberEthAddress: myAddress,
        memberName: myName,
      },
    ],
    noOfMembers: 1,
    task: task,
  };
  try {
    const org = await orgs.findOne({
      orgAddress: orgAddress,
    });
    if (org) {
      const teams = org.teams;
      teams.push(newTeam);
      const updatedOrg = await orgs.findOneAndUpdate(
        {
          orgAddress: orgAddress,
        },
        {
          teams: teams,
        }
      );
      if (updatedOrg) {
        return res.status(200).json({
          org: updatedOrg,
          message: "Team added to organization successfully",
        });
      } else {
        return res.status(401).json({
          org: org,
          message: "Failed to update organization",
        });
      }
    } else {
      return res.status(401).json({
        message: "Organization does not exist",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const addEmployeeToTeam = async (req, res) => {
  const { orgAddress, teamName, employeeAddress, employeeName } = req.body;
  try {
    const org = await orgs.findOne({
      orgAddress: orgAddress,
    });
    if (org) {
      const newMember = {
        memberEthAddress: employeeAddress,
        memberName: employeeName,
      };
      const teams = org.teams;
      teams.forEach((team) => {
        if (team.teamName === teamName) {
            team.members.push(newMember);
            team.noOfMembers += 1;
        }
        });
    //   teams[teamName].members.push(newMember);
    //   teams[teamName].noOfMembers += 1;
      const updatedOrg = await orgs.findOneAndUpdate(
        {
          orgAddress: orgAddress,
        },
        {
          teams: teams,
        }
      );
      if (updatedOrg) {
        return res.status(200).json({
          org: updatedOrg,
          message: "Employee added to team successfully",
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

export { addTeam, addEmployeeToTeam };
