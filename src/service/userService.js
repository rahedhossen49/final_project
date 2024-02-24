const User = require("../models/user");
const { emailSend } = require("../utility/emailHelper");
const { EncodeToken } = require("../utility/tokenHelper");

const createUserService = async (req) => {
  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ email: email, verify: true });
    if (existingUser) {
      return { status: "Fail", message: "Email already exists" };
    }
    let code = Math.floor(100000 + Math.random() * 900000);
    const emailText = `Your code verification code is= ${code}`;
    const emailSubject = "Email verification";

    await emailSend(email, emailText, emailSubject);
    await User.updateOne(
      { email: email },
      { $set: { otp: code.toString(), ...req.body } },
      { upsert: true }
    );

    return { status: "success", message: "OTP send success" };
  } catch (error) {
    return { message: "something error" };
  }
};

const userVerificationService = async (req) => {
  try {
    const email = req.params.email;
    const otp = req.params.otp;
    const total = await User.find({ email: email, otp: otp }).count("total");

    if (total === 1) {
      await User.updateOne(
        { email: email },
        { $set: { otp: "0", verify: true } },
        { upsert: true }
      );
      return { status: "success", message: "Valid OTP" };
    } else {
      return { status: "Fail", message: "invalid OTP" };
    }
  } catch (error) {
    return { status: "Fail", message: "invalid OTP" };
  }
};

const userLoginService = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return { message: "User not found" };
    }
    if (user.password !== password) {
      return { message: "Invalid password" };
    }
    const total = await User.find({ email: email, verify: true }).count(
      "total"
    );
    if (total === 1) {
      const user_id = await User.find({ email: email, verify: true }).select(
        "_id"
      );

      const token = EncodeToken(email, user_id[0]["_id"].toString());
      return { status: "success", message: "Login successfully", token: token };
    } else {
      return { status: "Fail" };
    }
  } catch (error) {
    console.log(error);
    return { status: "Fail", message: "something is wrong" };
  }
};
const userPictureService = async (req, res) => {
  try {
    const email = req.headers.email;
    const { image } = req.body;
    const total = await User.find({ email: email }).count("total");

    if (total === 1) {
      await User.updateOne(
        { email: email },
        { $set: { image: image } },
        { upsert: true }
      );
      return { status: "success" };
    } else {
      return { status: "Fail" };
    }
  } catch (error) {
    console.log(error);
    return { status: "Fail" };
  }
};
const updatePasswordService = async (req, res) => {
  try {
    const email = req.headers.email;
    const { password, confirmPassword } = req.body;
    const total = await User.find({ email: email }).count("total");
    if (password !== confirmPassword) {
      return {
        status: "Fail",
        message: "Password and confirm password do not match",
      };
    }
    if (total === 1) {
      await User.updateOne(
        { email: email },
        { $set: { password: password } },
        { upsert: true }
      );
      return { status: "success", message: "Password update success" };
    } else {
      return { status: "Fail" };
    }
  } catch (error) {
    console.log(error);
    return { status: "Fail" };
  }
};
const getUserProfileService = async (req, res) => {
  try {
    const email = req.headers.email;
    const user = await User.find({ email: email });
    return { status: "success", data: user };
  } catch (error) {
    console.log(error);
    return { status: "Fail" };
  }
};

module.exports = {
  userVerificationService,
  userLoginService,
  userPictureService,
  updatePasswordService,
  getUserProfileService,
  createUserService
};
