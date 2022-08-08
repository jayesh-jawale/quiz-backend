import { ObjectID } from "bson";
import { client } from "../index.js";

async function createQuestions(data) {
    return client
        .db("quizDatabase")
        .collection("quiz")
        .insertOne(data);
}

async function getQuestions() {
    return client
        .db("quizDatabase")
        .collection("quiz")
        .find()
        .toArray();
}

async function getQuestionsById(_id) {
    return client
        .db("quizDatabase")
        .collection("quiz")
        .findOne({_id: ObjectID(_id)})
}

async function updateQuestionById(_id, data) {
    return client
    .db("quizDatabase")
    .collection("quiz")
    .updateOne({ _id: ObjectID(_id) }, { $set: data })
}

async function deleteQuestionById(_id) {
    return client
    .db("quizDatabase")
    .collection("quiz")
    .deleteOne({ _id: ObjectID(_id) })

}

export {createQuestions, getQuestions, getQuestionsById, updateQuestionById, deleteQuestionById}