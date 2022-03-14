
import Administrator from "../../model/Administrator";
import { ChangeAdministratorDataDTO, ChangeAdministratorEmailDTO} from "./AdministratorBusiness";

export interface AdministratorRepository{
    signup(institution: Administrator): Promise<Administrator>
    activateAccount(id: string): Promise<void>
    findByEmail(email: string): Promise<Administrator | null>
    findByUsername(username: string): Promise<Administrator | null>
    findById(id: string): Promise<Administrator | null>
    editAccountData(changeData: ChangeAdministratorDataDTO): Promise<void>
    changeEmail(changeData: ChangeAdministratorEmailDTO): Promise<void>
    deleteAdministrator(id: string): Promise<void>
}