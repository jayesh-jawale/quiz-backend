import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  registerUser,
  getUserByEmail,
  generatePassword,
  getUsers
} from "../helpers/userHelpers.js";

const router = express.Router();

// Add User
router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;
  const userFromDB = await getUserByEmail(email);

  if (userFromDB) {
    res.status(401).send({ message: "Email already exists" });
  } else {
    const hashPassword = await generatePassword(password);
    const register = await registerUser({
      name: name,
      email: email,
      password: hashPassword,
      role: role || "basic"
    });

    res.send(register);
  }
});

router.post("/login", async (req, res) => {
  const { email, password, role } = req.body;
  const userFromDB = await getUserByEmail(email);

  if (!userFromDB) {
    res.status(401).send({ message: "Invalid Credentials" });
  } else {
    const storedPassword = userFromDB.password;
    const comparePass = await bcrypt.compare(password, storedPassword);
    if (comparePass) {
      if(userFromDB.role === "basic") {
      // Issue the token
      const token = jwt.sign({ id: userFromDB._id }, process.env.SECRET_KEY);
      res.status(200).send({ message: "Successfull login", token: token, role: role });
      } else {
        const token = jwt.sign({ id: userFromDB._id }, process.env.SECRET_KEY);
        res.status(201).send({ message: "Successfull login", token: token, role: role });
      }
    } else {
      res.status(401).send({ message: "Invalid Credentials" });
      return;
    }
  }
});

// Get user
router.get("/get-user", async(req, res) => {
  const userId = req.userId;
  const getUser = await getUsers(userId);
  res.send(getUser);
})

export const userRouter = router;
