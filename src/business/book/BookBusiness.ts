import { prismaClient } from "../../data/BaseDatabase"
import Book, { PRESERVATION_TYPES } from "../../model/Book"
import { IdGenerator } from "../../services/IdGenerator"
import { BookRepository } from "./BookRepository"

export type InsertBookDTO = {
    name: string,
    edition: string,
    year: string,
    releaseDate: string,
    preservation: PRESERVATION_TYPES,
    institutionId: string,
    quantity: number,
    adress: string
}
export type EditBookDTO = {
    id: string,
    edition: string,
    preservation: PRESERVATION_TYPES,
    institutionId: string
}
export type InstitutionBookDTO = {
    name: string,
    cep: string,
    state: string,
    city: string,
    neighborhood: string,
    adress: string,
    administratorId: string,
    book: Book
}

export type ChangeQuantityBookDataDTO = {
    id: string,
    quantity: number
}

export default class BookBusiness {
    private bookData: BookRepository
    private idGenarator: IdGenerator
    constructor(bookDataImplementation: BookRepository) {
        this.bookData = bookDataImplementation
        this.idGenarator = new IdGenerator()
    }

    create = async (input: InsertBookDTO) => {
        const { name, edition, year, releaseDate, preservation, institutionId, quantity, adress } = input

        if (!name) {
            throw new Error("Please, inform a name for this book.")
        }
        if (!edition) {
            throw new Error("Please, inform a edition for this book.")
        }
        if (!year) {
            throw new Error("Please, inform a year for this book.")
        }
        if (!releaseDate) {
            throw new Error("Please, inform a release date for this book.")
        }
        if (preservation.toLocaleUpperCase() !== "NEW" && preservation.toLocaleUpperCase() !== "USED" && preservation.toLocaleUpperCase() !== "DAMAGED") {
            throw new Error("Preservation must be NEW, or USED or DAMAGED.")
        }
        if (!institutionId) {
            throw new Error("Please, inform a institutionId for this book.")
        }
        if (!quantity) {
            throw new Error("Please, inform a quantity for this book.")
        }
        if (quantity <= 0) {
            throw new Error("Quantity of book must be greater than 1.")
        }
        if (!adress) {
            throw new Error("Please, inform a adress for this book.")
        }


        const registeredBookName = await this.bookData.findByName(name)

        if (registeredBookName?.getName() === name && registeredBookName.getEdition() === edition && registeredBookName.geInstitutionId() === institutionId) {
            throw new Error("Book already registered in this institution!")
        }

        const id = this.idGenarator.generateId()

        const book = new Book(
            id,
            name,
            edition,
            year,
            releaseDate,
            preservation,
            institutionId,
            quantity,
            adress
        )
        

        await this.bookData.create(book)
    }

    edit = async (input: EditBookDTO) => {
        const { id, edition, preservation, institutionId } = input

        if (!id) {
            throw new Error("Please, inform a book id.")
        }
        if (!edition) {
            throw new Error("Please, inform a book edition.")
        }
        if (!preservation) {
            throw new Error("Please, inform a book preservation.")
        }
        if (!institutionId) {
            throw new Error("Please, inform a book institution Id.")
        }
        if (preservation.toLocaleUpperCase() !== "NEW" && preservation.toLocaleUpperCase() !== "USED" && preservation.toLocaleUpperCase() !== "DAMAGED") {
            throw new Error("Preservation must be NEW, or USED or DAMAGED.")
        }

        const registeredBook = await this.bookData.findById(id)

        if (!registeredBook) {
            throw new Error("Book not found")
        }



        await this.bookData.edit(input)
    }
    donate = async (donateData: ChangeQuantityBookDataDTO) => {
        const { id, quantity } = donateData
        if (!id) {
            throw new Error("Please, inform book's id for donation.")
        }
        if (!quantity) {
            throw new Error("Please, inform book's quantity for donation.")
        }
        if (quantity <= 0) {
            throw new Error("Quantity of book must be greater than 1.")
        }
        const registeredBook = await this.bookData.findById(id)
        if (!registeredBook) {
            throw new Error("Book not found")
        }
        if (registeredBook.getQuantity() < quantity) {
            throw new Error("Quantity of donation is greater than book's collection!")
        }

        const newQuantity = registeredBook.getQuantity() - quantity

        const donateDataDTO: ChangeQuantityBookDataDTO = {
            id,
            quantity: newQuantity
        }

        await this.bookData.donate(donateDataDTO)
    }
    add = async (addData: ChangeQuantityBookDataDTO) => {
        const { id, quantity } = addData
        if (!id) {
            throw new Error("Please, inform book's id for donation.")
        }
        if (!quantity) {
            throw new Error("Please, inform book's quantity for donation.")
        }
        if (quantity <= 0) {
            throw new Error("Quantity of book must be greater than 1.")
        }
        const registeredBook = await this.bookData.findById(id)
        if (!registeredBook) {
            throw new Error("Book not found")
        }
        
        const newQuantity = registeredBook.getQuantity() + quantity

        const donateDataDTO: ChangeQuantityBookDataDTO = {
            id,
            quantity: newQuantity
        }

        await this.bookData.add(donateDataDTO)
    }
}