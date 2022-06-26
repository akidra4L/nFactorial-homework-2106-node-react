import { ObjectId } from "mongodb";
import express from "express";
import cors from "cors";
import client from '../client/MongoClient.js';

const db = client.db("to-do-hw");
const collection = db.collection("to-do-hw");

const app = express();

app.use(cors());
app.use(express.json());

// Get all ToDos
app.get("/todos", async (req, res) => {
    const todos = await collection.find({}).toArray();
    res.send(todos);
});

// Add ToDo 
app.post("/todos", async (req, res) => {
    const {title, done} = req.body;
    const response = await collection.insertOne(
        req.body
    );

    const result = {
        id: response.insertedId,
        title,
        done
    };
    res.send(result);
});

// Update Task
app.put("/todos/:id", async (req, res) => {
    const { todo, done } = req.body;
    const { id } = req.params;

    await collection.updateOne(
        {
            _id: new ObjectId(id),
        },
        {
            $set: req.body
        },
    );

    const result = {
        _id: id,
        todo,
        done,
    };
    res.send(result);
});

// Delete Task
app.delete("/todos/:id", async (req, res) => {
    const { todo, done } = req.body;
    const { id } = req.params;
    
    await collection.deleteOne(
        {
            _id: new ObjectId(id),
        },
        {
            $set: req.body
        },
    );

    const result = {
        _id: id,
        todo,
        done,
    };
    res.send(result);
})

export default app;