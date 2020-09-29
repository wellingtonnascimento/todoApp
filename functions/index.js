const functions = require("firebase-functions");
const app = require("express")();

const auth = require("./util/auth");
const {
  loginUser,
  signUpUser,
  uploadProfilePhoto,
  getUserDetail,
} = require("./APIs/users");

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
app.post("/signup", signUpUser);
app.post("/user/image", auth, uploadProfilePhoto);
app.get("/user", auth, getUserDetail);

exports.api = functions.https.onRequest(app);
