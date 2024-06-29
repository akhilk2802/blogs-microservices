const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const router = express.Router();
const { User, validate } = require("../model/user");
const dotenv = require("dotenv");
dotenv.config();

const secret = "auth-service";

router.get("/me", async (req, res) => {
  const user = await User.findById(req.user._id);
  res.send(user);
});

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, secret, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

router.post("/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  if (!user) {
    return res.status(400).send("Invalid email or password");
  } else {
    const token = jwt.sign({ id: user.id, username: user.name }, secret, {
      expiresIn: "1h",
    });
    return res.json({ token });
  }
});

router.put("/update", authenticateJWT, async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email, phoneNumber, password } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { name, email, phoneNumber, password },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.json(user);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.get("/all", authenticateJWT, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/delete", authenticateJWT, async (req, res) => {
  //   console.log(req)
  try {
    const { name } = req.body;
    console.log(name);

    if (req.user.username !== name) {
      return res
        .status(403)
        .send("You do not have permission to delete this user.");
    }

    const user = await User.findOneAndDelete({ name });

    if (!user) {
      return res.status(404).send("User not found.");
    }

    res.send("User deleted successfully.");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.post("/register", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ phoneNumber: req.body.phoneNumber });
  if (user) return res.status(400).send("User already registered.");

  const { name, email, phoneNumber, password } = req.body;

  user = new User({
    name,
    email,
    phoneNumber,
    password,
  });

  try {
    await user.save();
    return res.status(201).send(user);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

exports.user = router;
