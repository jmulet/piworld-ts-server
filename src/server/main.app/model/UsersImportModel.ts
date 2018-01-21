import { UserModel, UserRoles } from "../entities/UserModel";


export class UsersImportModel {
    mustChgPwd: boolean;
    csv: string;
    schoolId: number;
    updateIfExists: boolean;
    idRole: number;


    isValid(): boolean {

        return true;
    }

    parse()  {
        const parsed = [];
        const logErrors = [];

        const lines = this.csv.split("\n");
        const expect = 0;
        const correct = 0;
        const values = [];
        lines.forEach( (l) => {
            const ll = l.trim();
            if (ll.indexOf(":") >= 0) {
                const fields = ll.split(":");
                const n = fields.length;
                const username = (n > 0 ? fields[0] : "").replace(/ /g, "");
                const fullname = (n > 1 ? fields[1].trim() : "");
                const password = (n > 2 ? fields[2].trim() : "").replace(/ /g, "");
                const email = (n > 3 ? fields[3].trim() : "");
                const phone = (n > 4 ? fields[4].trim() : "");

                if (username && fullname) {
                    const user = new UserModel();
                    user.username = username;
                    user.fullname = fullname;
                    user.password = password;
                    user.email = email? email: null;
                    user.phone = phone;
                    user.schoolId = this.schoolId;
                    user.idRole = this.idRole || UserRoles.student;       
                    user.valid = 1;
                    user.mustChgPwd = this.mustChgPwd? 1 : 0;             
                    parsed.push(user);                    
                    } else  {
                        logErrors.push("Error: Username and fullname required in line -> " + ll);
                    }
            }
            else {
                logErrors.push("Error: Can't process line -> " + ll);
            }
        });
        return {parsed, logErrors};
    }
}