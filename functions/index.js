const functions = require("firebase-functions");
const app = require("express")();

const auth = require("./util/auth");
const {
  loginUser,
  signUpUser,
  uploadProfilePhoto,
  getUserDetail,
  updateUserDetails,
} = require("./APIs/users");

const {
  listAllTodo,
  createTodo,
  deleteTodo,
  editTodo,
} = require("./APIs/todos");

//todo
app.get("/todos", auth, listAllTodo);
app.post("/todo", auth, createTodo);
app.delete("/todo/:todoId", auth, deleteTodo);
app.put("/todo/:todoId", auth, editTodo);

//user
app.post("/login", loginUser);
app.post("/signup", signUpUser);
app.post("/user/image", auth, uploadProfilePhoto);
app.get("/user", auth, getUserDetail);
app.post("/user", auth, updateUserDetails);

exports.api = functions.https.onRequest(app);
