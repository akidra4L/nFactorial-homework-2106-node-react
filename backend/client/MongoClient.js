import { MongoClient } from "mongodb";
import config from "../config/Config.js";

const client = new MongoClient(config.url);
client
    .connect()
    .then(() => {
        console.log("Connected!");
    })
    .catch((err) => {
        console.log(err);
    });

export default client;