

export default class Institution{
    constructor(
        private id: string,
        private name: string,
        private cep: string,
        private state: string,
        private city: string,
        private neighborhood: string,
        private adress: string,
    ) { }
    getId() {
        return this.id
    }
    getName() {
        return this.name
    }
    getCep() {
        return this.cep
    }
    getState() {
        return this.state
    }
    getCity() {
        return this.city
    }
    getNeighborhood() {
        return this.neighborhood
    }
    getAdress() {
        return this.adress
    }
}