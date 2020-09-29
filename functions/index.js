const functions = require("firebase-functions");
const app = require("express")();

const { listAllTodo, createTodo, deleteTodo } = require("./APIs/todos");

app.get("/todos", listAllTodo);
app.post("/todo", createTodo);
app.delete("/todo/:todoId", deleteTodo);

exports.api = functions.https.onRequest(app);
