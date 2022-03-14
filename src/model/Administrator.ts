export type authenticationData = {
    id: string
    email: string
}

export default class Administrator{
    constructor(
        private id: string,
        private name: string,
        private email: string,
        private username: string,
        private password: string,
        private institutionId: string,
    ) { }
    getId() {
        return this.id
    }
    getName() {
        return this.name
    }
    getEmail() {
        return this.email
    }
    getUsername() {
        return this.username
    }
    getPassword() {
        return this.password
    }
    getInstitutionId() {
        return this.institutionId
    }
}