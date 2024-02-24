const User = require("../models/user");
const {
  userVerificationService,
  userLoginService,
  userPictureService,
  updatePasswordService,
  getUserProfileService,
  createUserService,
} = require("../service/userService");
const { emailSend } = require("../utility/emailHelper");

const createUser = async (req, res) => {
  const result = await createUserService(req)
  if (result.status === "success") {
    return res.status(200).json(result);
  } else {
    return res.status(200).json(result);
  }
};

const userVerification = async (req, res) => {
  const result = await userVerificationService(req);

  if (result.status === "success") {
    return res.status(200).json(result);
  } else {
    return res.status(200).json(result);
  }
};
const userLogin = async (req, res) => {
  const result = await userLoginService(req);
  if (result.status === "success") {
    const cookiesOption = {
      expires: new Date(Date.now() + 24 * 6060 * 1000),
      httpOnly: false,
    };
    res.cookie("token", result.token, cookiesOption);
    return res.status(200).json(result);
  } else {
    return res.status(200).json(result);
  }
};
const userProfile = async (req, res) => {
  const result = await getUserProfileService(req);
  if (result.status === "success") {
    return res.status(200).json(result);
  } else {
    return res.status(200).json(result);
  }
};
const userLogout = async (req, res) => {
  try {
    const cookiesOption = {
      expires: new Date(Date.now() - 24 * 6060 * 1000),
      httpOnly: false,
    };
    res.cookie("token", "", cookiesOption);
    return res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    console.log(error);
  }
};
const updateImage = async (req, res) => {
  try {
    const result = await userPictureService(req);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};
const updatePassword = async (req, res) => {
  try {
    const result = await updatePasswordService(req);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  createUser,
  userVerification,
  userLogin,
  userLogout,
  updateImage,
  updatePassword,
  userProfile
};
