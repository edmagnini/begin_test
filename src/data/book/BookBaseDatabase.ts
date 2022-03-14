import { ChangeQuantityBookDataDTO, EditBookDTO } from "../../business/book/BookBusiness";
import { BookRepository } from "../../business/book/BookRepository";
import Book from "../../model/Book";
import { prismaClient } from "../BaseDatabase";


export default class BookBaseDatabase implements BookRepository {
    protected TABLE_NAME = 'book'

    create = async (book: Book) => {
        try {
            await prismaClient.book.create({
                data: {
                    id: book.getId(),
                    name: book.getName(),
                    edition: book.getEdition(),
                    year: book.getYear(),
                    release_date: book.getReleaseDate(),
                    preservation: book.getPreservation(),
                    institution_id: book.geInstitutionId(),
                    quantity: book.getQuantity(),
                    adress: book.getAdress(),
                },
            })
            return book
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
    findByName = async (name: string) => {
        try {
            const queryResult: any = await prismaClient.book.findFirst({
                where: {
                    name,
                }
            })
            if (queryResult) {
                const bookResult = new Book(
                    queryResult.id,
                    queryResult.name,
                    queryResult.edition,
                    queryResult.year,
                    queryResult.releaseDate,
                    queryResult.preservation,
                    queryResult.institutionId,
                    queryResult.quantity,
                    queryResult.adress,                
                )
                return bookResult
            } else {
                return null
            }
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
    findById = async (id: string) => {
        try {
            const queryResult: any = await prismaClient.book.findFirst({
                where: {
                    id,
                }
            })
            if (queryResult) {
                const bookResult = new Book(
                    queryResult.id,
                    queryResult.name,
                    queryResult.edition,
                    queryResult.year,
                    queryResult.releaseDate,
                    queryResult.preservation,
                    queryResult.institutionId,
                    queryResult.quantity,
                    queryResult.adress,                
                )
                return bookResult
            } else {
                return null
            }
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
    edit = async (bookData: EditBookDTO) => {
        try {
            await prismaClient.book.update({
                where: {
                    id: bookData.id,
                },
                data: {
                    edition: bookData.edition,
                    preservation: bookData.preservation,
                    institution_id: bookData.institutionId,
                },
            })
            return bookData
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
    donate = async (donateData: ChangeQuantityBookDataDTO) => {
        try {
            await prismaClient.book.update({
                where: {
                    id: donateData.id,
                },
                data: {
                    quantity: donateData.quantity
                }
            })
        } catch (error: any) {
            throw new Error("Erro ao buscar usuário no banco")
        }
    }
    add = async (addData: ChangeQuantityBookDataDTO) => {
        try {
            await prismaClient.book.update({
                where: {
                    id: addData.id,
                },
                data: {
                    quantity: addData.quantity
                }
            })
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}