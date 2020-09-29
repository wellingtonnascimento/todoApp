const functions = require("firebase-functions");
const app = require("express")();

const { listAllTodo, createTodo } = require("./APIs/todos");

app.get("/todos", listAllTodo);
app.post("/todo", createTodo);

exports.api = functions.https.onRequest(app);
