const { db } = require("../util/admin");

exports.listAllTodo = (request, response) => {
  db.collection("todos")
    .where("email", "==", request.user.email)
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      let todos = [];
      data.forEach((doc) => {
        todos.push({
          todoId: doc.id,
          title: doc.data().title,
          createdAt: doc.data().createdAt,
        });
      });
      return response.json(todos);
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({ error: err.code });
    });
};

exports.getOneTodo = (request, response) => {
  db.doc(`/todos/${request.params.todoId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return response.status(404).json({
          error: "Todo not found",
        });
      }
      if (doc.data().email !== request.user.email) {
        return response.status(403).json({ error: "UnAuthorized" });
      }
      TodoData = doc.data();
      TodoData.todoId = doc.id;
      return response.json(TodoData);
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({ error: error.code });
    });
};

exports.createTodo = (request, response) => {
  if (request.body.title.trim() === "") {
    return response.status(400).json({ title: "Must not be empty" });
  }

  const newTodoItem = {
    title: request.body.title,
    email: request.user.email,
    createdAt: new Date().toISOString(),
  };
  db.collection("todos")
    .add(newTodoItem)
    .then((doc) => {
      const responseTodoItem = newTodoItem;
      responseTodoItem.id = doc.id;
      return response.json(responseTodoItem);
    })
    .catch((err) => {
      response.status(500).json({ error: "Something went wrong" });
      console.error(err);
    });
};

exports.deleteTodo = (request, response) => {
  const document = db.doc(`/todos/${request.params.todoId}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return response.status(404).json({ error: "Todo not found" });
      }
      if (doc.data().email !== request.user.email) {
        return response.status(403).json({ error: "UnAuthorized" });
      }
      return document.delete();
    })
    .then(() => {
      response.json({ message: "Delete successfull" });
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({ error: err.code });
    });
};

exports.editTodo = (request, response) => {
  if (request.body.todoId || request.body.createdAt) {
    response.status(403).json({ message: "Not allowed to edit" });
  }
  let document = db.collection("todos").doc(`${request.params.todoId}`);
  document
    .update(request.body)
    .then(() => {
      response.json({ message: "Updated successfully" });
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({
        error: err.code,
      });
    });
};
