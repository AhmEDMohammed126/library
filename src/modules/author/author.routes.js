import { Router } from "express";
import * as authorController from "./author.controller.js"
const authorRouter=Router();
authorRouter.post('/addAuthor',authorController.addAuthor)
authorRouter.get('/getAllAuthors',authorController.getAllAuthors)
authorRouter.get('/getAuthorById/:id',authorController.getAuthorById)
authorRouter.put('/upAuthorById/:id',authorController.upAuthorById)
authorRouter.delete('/deleteAuthor/:id',authorController.deleteAuthor)
authorRouter.get('/getAllAuthorsAndBooks',authorController.getAllAuthorsAndBooks)
authorRouter.post('/authorSearch',authorController.authorSearch)
export default authorRouter;