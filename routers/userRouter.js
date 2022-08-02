import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  registerUser,
  getUserByEmail,
  generatePassword,
} from "../helpers/userHelpers.js";

const router = express.Router();

// Add User
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const userFromDB = await getUserByEmail(email);

  if (userFromDB) {
    res.status(401).send({ message: "Email already exists" });
  } else {
    const hashPassword = await generatePassword(password);
    const register = await registerUser({
      name: name,
      email: email,
      password: hashPassword,
    });

    res.send(register);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userFromDB = await getUserByEmail(email);

  if (!userFromDB) {
    res.status(401).send({ message: "Invalid Credentials" });
  } else {
    const storedPassword = userFromDB.password;
    const comparePass = await bcrypt.compare(password, storedPassword);
    if (comparePass) {
      // Issue the token
      const token = jwt.sign({ id: userFromDB._id }, process.env.SECRET_KEY);
      res.send({ message: "Successfull login", token: token });
    } else {
      res.status(401).send({ message: "Invalid Credentials" });
      return;
    }
  }
});

export const userRouter = router;
