const functions = require("firebase-functions");
const app = require("express")();

const {
  listAllTodo,
  createTodo,
  deleteTodo,
  editTodo,
} = require("./APIs/todos");

app.get("/todos", listAllTodo);
app.post("/todo", createTodo);
app.delete("/todo/:todoId", deleteTodo);
app.put("/todo/:todoId", editTodo);

exports.api = functions.https.onRequest(app);
