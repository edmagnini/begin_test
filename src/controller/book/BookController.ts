import { Request, Response } from "express";
import BookBusiness, { ChangeQuantityBookDataDTO, EditBookDTO, InsertBookDTO } from "../../business/book/BookBusiness";
import BookBaseDatabase from "../../data/book/BookBaseDatabase";


export default class BookController {
    private BookBusiness: BookBusiness
    constructor() {
        this.BookBusiness = new BookBusiness(new BookBaseDatabase())
    }

    create = async (req: Request, res: Response) => {
        const { name, edition, year, releaseDate, preservation, institutionId, quantity, adress } = req.body

        const input: InsertBookDTO = {
            name,
            edition,
            year,
            releaseDate,
            preservation,
            institutionId,
            quantity,
            adress
        }
        try {
            await this.BookBusiness.create(input)

            res.status(200).send("Book has been created!")
        } catch (error: any) {
            if (error.message) return res.status(400).send(error.message)
            res.status(400).send("Create book Error.")
        }
    }

    edit = async (req: Request, res: Response) => {
        const { edition, preservation, institutionId } = req.body
        const id: string = req.params.id as string

        const input: EditBookDTO = {
            id,
            edition,
            preservation,
            institutionId
        }

        try {
            await this.BookBusiness.edit(input)

            res.status(200).send("Book has been edited!")
        } catch (error: any) {
            if (error.message) return res.status(400).send(error.message)
            res.status(400).send("Edit book Error.")
        }
    }
    donate = async (req: Request, res: Response) => {
        const { id, quantity } = req.body
        const input: ChangeQuantityBookDataDTO = {
            id,
            quantity
        }
        try {
            await this.BookBusiness.donate(input)
            res.status(200).send("Successfuly donation!")
        } catch (error: any) {
            if (error.message) return res.status(400).send(error.message)
            res.status(400).send("Donate book Error.")
        }
    }
    add = async (req: Request, res: Response) => {
        const { id, quantity } = req.body
        const input: ChangeQuantityBookDataDTO = {
            id,
            quantity
        }
        try {
            await this.BookBusiness.add(input)
            res.status(200).send("Successfuly!")
        } catch (error: any) {
            if (error.message) return res.status(400).send(error.message)
            res.status(400).send("Add book Error.")
        }
    }
}