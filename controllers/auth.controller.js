import bcrypt from "bcrypt";
import userModel from "../models/user.model.js";

const login = async (req, res) => {
  const { name, email, signerMessage, ethAddress, signature } = req.body;
  try {
    const user = await userModel.findOne({
      ethAddress: ethAddress,
    });
    if (user) {
      const isMatch = await bcrypt.compare(signerMessage, user.signerMessage);
      const isSigMatch = await bcrypt.compare(signature, user.signature);
      if (isMatch && isSigMatch) {
        return res
          .status(200)
          .json({ user: user, message: "user logged in successfully" });
      } else {
        return res.status(401).json({ message: "Invalid credentials" });
      }
    }
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Couldn't login at this stage. Please try again" });
  }
};

const signup = async (req, res) => {
  try {
    const { signerMessage, ethAddress, signature } = req.body;
    const userExists = await userModel.findOne({
      ethAddress: ethAddress,
    });
    if (userExists) {
      return res
        .status(200)
        .json({ user: userExists, message: "User already exists" });
    }
    const hashedMessage = await bcrypt.hash(signerMessage, 10);
    const hashedSig = await bcrypt.hash(signature, 10);
    const user = new userModel({
      signerMessage: hashedMessage,
      ethAddress: ethAddress,
      signature: hashedSig,
    });
    const saveCheck = await user.save();
    if (saveCheck) {
      return res
        .status(200)
        .json({ user: user, message: "user saved successfully" });
    } else {
      return res.status(401).json({
        user: user,
        message: "Failed to sign-up lease try again later",
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Couldn't signup at this stage. Please try again" });
  }
};

export { login, signup };
