import app from "./controller/app";
import postController from "./controller/postController";
import useController from "./controller/UserController";

const userController = new useController()
const postsController = new postController()
app.post("/user/signup", userController.signup );
app.post("/user/login", userController.login)
app.post("/create/post", postsController.post)
app.post("/users/friends", userController.friends)
app.get("/posts/:id", postsController.getPost)
app.delete("/delete/:id", userController.deleteFriend)