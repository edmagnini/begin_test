import Institution from "../../model/Institution";
import { InstitutionBookDTO } from "./InstitutionBusiness";


export interface InstitutionRepository {
    create(institution: Institution): Promise<Institution>
    findByName(name: string): Promise<Institution | null>
    getInstitutionCollection(): Promise<InstitutionBookDTO | null>
    getInstitutionCollectionById(institutionId: string): Promise<InstitutionBookDTO | null>
}