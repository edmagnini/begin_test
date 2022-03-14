export enum PRESERVATION_TYPES {
    NEW = "NEW",
    USED = "USED",
    DAMAGED = "DAMAGED"
}

export default class Book{
    constructor(
        private id: string,
        private name: string,
        private edition: string,
        private year: string,
        private releaseDate: string,
        private preservation: PRESERVATION_TYPES,
        private institutionId: string,
        private quantity: number,
        private adress: string,
    ) { }
    getId() {
        return this.id
    }
    getName() {
        return this.name
    }
    getEdition() {
        return this.edition
    }
    getYear() {
        return this.year
    }
    getReleaseDate() {
        return this.releaseDate
    }
    getPreservation() {
        return this.preservation
    }
    geInstitutionId() {
        return this.institutionId
    }
    getQuantity() {
        return this.quantity
    }
    getAdress() {
        return this.adress
    }
}