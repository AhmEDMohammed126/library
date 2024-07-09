import { Router } from "express";
import * as bookController from "./book.controller.js"
const bookRouter=Router();
bookRouter.post('/addBook',bookController.addBook)
bookRouter.get('/listBooks',bookController.listBooks)
bookRouter.get('/bookById/:id',bookController.bookById)
bookRouter.patch('/upBook/:id',bookController.upBook)
bookRouter.delete('/deleteBook/:id',bookController.deleteBook)
bookRouter.post('/bookSearch',bookController.bookSearch)

export default bookRouter;