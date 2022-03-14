import express from 'express'
import BookController from '../controller/book/BookController'

export const bookRouter = express.Router()

const bookController = new BookController()

bookRouter.post("/create", bookController.create)
bookRouter.post("/edit/:id", bookController.edit)
bookRouter.post("/donate", bookController.donate)
bookRouter.post("/add", bookController.add)
