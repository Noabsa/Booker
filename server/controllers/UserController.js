const models = require("../models/Models");
const User = models.UserModel;
const validator = require("validator");
const jwt = require("jsonwebtoken");
const jwt_secret = process.env.JWT_SECRET;
const argon2 = require("argon2");

// ADD users to DB
const deleteUser = async (req, res) => {
  const { email } = req.body;
  try {
    await User.deleteOne({ email: email });
    res.json({ ok: true, msg: "Account deleted" });
  } catch (error) {
    res.json({
      ok: false,
      msg: "Something went wrong, try it later",
      error: error,
    });
    console.log(error);
  }
};

const register = async (req, res) => {
  const { name, surname, email, password, password2 } = req.body;
  if (!name || !surname || !email || !password || !password2) {
    return res.json({
      ok: false,
      message: "All fields required",
      mark: {
        name: !!name,
        surname: !!surname,
        email: !!email,
        password: !!password,
        password2: !!password2,
      },
    });
  }
  if (password.length < 8) {
    return res.json({
      ok: false,
      message: "Password must have 8 characters at least",
      mark: {
        password: false,
      },
    });
  }
  if (password !== password2) {
    return res.json({
      ok: false,
      message: "Passwords must match",
      mark: {
        password: false,
        password2: false,
      },
    });
  }
  if (!validator.isEmail(email)) {
    return res.json({
      ok: false,
      message: "Invalid credentials",
      mark: {
        email: false,
      },
    });
  }
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.json({
        ok: false,
        message: "Existent email, please, check your credentials",
        mark: {
          email: false,
        },
      });
    } else {
      const hash = await argon2.hash(password);
      const newUser = {
        name,
        surname,
        email,
        password: hash,
      };
      await User.create(newUser);
      res.json({
        ok: true,
        message: "Successfully registered",
        mark: {},
      });
    }
  } catch (error) {
    res.json({ ok: false, error });
  }
};

// LOGIN users
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({
      ok: false,
      message: "All fields are required",
      mark: {
        email: !!email,
        password: !!password,
      },
    });
  }
  if (!validator.isEmail(email)) {
    return res.json({
      ok: false,
      message: "Invalid mail provided",
      mark: {
        email: false,
      },
    });
  }
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        ok: false,
        message: "Invalid data provided",
        mark: {
          email: false,
        },
      });
    }
    const match = await argon2.verify(user.password, password);
    if (match) {
      const token = jwt.sign({ userEmail: user.email }, jwt_secret, {
        expiresIn: "100h",
      });
      res.json({
        ok: true,
        message: "welcome back",
        token,
        email,
        user,
        mark: {},
      });
    } else {
      return res.json({
        ok: false,
        message: "Invalid data provided",
        mark: {},
      });
    }
  } catch (error) {
    res.json({ ok: false, error });
  }
};

// TOKEN verification
const tokenVerification = (req, res) => {
  const token = req.headers.authorization;
  jwt.verify(token, jwt_secret, (err, succ) => {
    err
      ? res.json({
          ok: false,
          message: "ops, seems that something went wrong...",
        })
      : res.json({ ok: true, succ });
  });
};

const getUserData = async (req, res) => {
  let { email } = req.body;
  let user = await User.find({ email: email });
  if (user.length) {
    res.send({ ok: true, user: user[0] });
  } else {
    res.send({ ok: false });
  }
};
module.exports = {
  register,
  login,
  tokenVerification,
  getUserData,
  deleteUser,
};
