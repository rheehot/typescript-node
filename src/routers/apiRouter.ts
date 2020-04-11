import * as express from "express";
import {
  createUser,
  createBook,
  books,
  updateBook,
  deleteBook,
} from "../controllers/apiController";

const apiRouter = express.Router();

apiRouter.get("/books", books);
apiRouter.get("/createUser", createUser);
apiRouter.get("/createBook", createBook);
apiRouter.get("/updateBook", updateBook);
apiRouter.get("/deleteBook", deleteBook);

export default apiRouter;
