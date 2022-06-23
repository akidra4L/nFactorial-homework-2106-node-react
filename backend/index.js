import express from "express";
import cors from "cors";
import { ObjectId, MongoClient } from "mongodb";

const app = express();

app.use(cors());
app.use(express.json());

const port = 3000;
const url = 
    "mongodb+srv://akidra4L:q1845544Q@cluster0.8tuyd.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(url);
client
    .connect()
    .then(() => {
        console.log("Connected!");
    })
    .catch((err) => {
        console.log(err);
    });

// Get all ToDos
app.get("/todos", async (req, res) => {
    const db = client.db("to-do-hw");
    const collection = db.collection("to-do-hw");

    const result = await collection.find({}).toArray();
    res.send(result);
});

// Add ToDo 
app.post("/todos", async (req, res) => {
    const { todo, done } = req.body;
    const db = client.db("to-do-hw");
    const collection = db.collection("to-do-hw");

    const response = await collection.insertOne(
        req.body
    );

    const result = {
        id: response.insertedId,
        todo,
        done,
    };
    res.send(result);
});

app.put("/todos/:id", async (req, res) => {
    const { todo, done } = req.body;
    const { id } = req.params;

    const db = client.db("to-do-hw");
    const collection = db.collection("to-do-hw");

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

app.delete("/todos/:id", async (req, res) => {
    const { todo, done } = req.body;
    const { id } = req.params;

    const db = client.db("to-do-hw");
    const collection = db.collection("to-do-hw");

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

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});