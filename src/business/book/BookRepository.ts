import Book from "../../model/Book";
import { ChangeQuantityBookDataDTO, EditBookDTO } from "./BookBusiness";

export interface BookRepository {
    create(book: Book): Promise<Book>
    findByName(name: string): Promise<Book | null>
    findById(id: string): Promise<Book | null>
    edit(bookData: EditBookDTO): Promise<EditBookDTO>
    donate(donateData: ChangeQuantityBookDataDTO): Promise<void>
    add(addData: ChangeQuantityBookDataDTO): Promise<void>
}