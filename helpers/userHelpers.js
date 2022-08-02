import { client } from "../index.js";
import bcrypt from "bcrypt";

async function registerUser(registerData) {
    return client
        .db("quizDatabase")
        .collection("user")
        .insertOne(registerData);
}

async function generatePassword(password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword;
}

async function getUserByEmail(email) {
    return client
    .db("quizDatabase")
    .collection("user")
    .findOne({email : email});
}

export {registerUser, getUserByEmail, generatePassword}