import { ObjectID } from "bson";
import express from "express";
import { createQuestions, getQuestions, getQuestionsById, updateQuestionById, deleteQuestionById } from "../helpers/questionsHelpers.js";

const router = express.Router();

// Create Question
router.post('/create-question', express.json(), async(req, res) => {
    const data = req.body;
    const createdQuestions = await createQuestions(data);

    res.send(createdQuestions);
})

// Get Questions
router.get('/get-question', async (req, res) => {
    const getQuizQuestions = await getQuestions();
    res.send(getQuizQuestions);
})

// Get Question by Id
router.get('/get-question/:_id', async (req, res) => {
    const {_id} = req.params;
    // var reqId = req.params._id
    // var reqQuery = reqId.toString()

    const getQuizQuestionsById = await getQuestionsById(_id);
    res.send(getQuizQuestionsById);
})

// Update Question by Id
router.put('/update-question/:_id', async (req, res) => {
    const {_id} = req.params;
    const data = req.body;
    const updatedQuestionById = await updateQuestionById(_id, data);
    res.send(updatedQuestionById);
});

// Delete Question by Id
router.delete('/delete-question/:_id', async (req, res) => {
    const {_id} = req.params;

    const deletedQuestionById = await deleteQuestionById(_id);
    res.send(deletedQuestionById);
});

export const quizRouter = router;