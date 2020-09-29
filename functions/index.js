const functions = require("firebase-functions");
const app = require("express")();

const { loginUser } = require("./APIs/users");

const {
  listAllTodo,
  createTodo,
  deleteTodo,
  editTodo,
} = require("./APIs/todos");

//todo
app.get("/todos", listAllTodo);
app.post("/todo", createTodo);
app.delete("/todo/:todoId", deleteTodo);
app.put("/todo/:todoId", editTodo);

//user
app.post("/login", loginUser);

exports.api = functions.https.onRequest(app);
