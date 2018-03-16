import { UserModel, UserRoles } from "../entities/UserModel";
import { OffspringModel } from "../entities/OffspringModel";


export class UsersImportModel {
    mustChgPwd: boolean;
    csv: string;
    idSchool: number;
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
                const recovery = (n > 4 ? fields[4].trim() : "");
                const children = (n > 5 ? fields[5].trim() : "");

                if (username && fullname) {
                    const user = new UserModel();
                    user.username = username;
                    user.fullname = fullname;
                    user.password = password;
                    user.email = email? email: null;
                    user.recovery = recovery;
                    user.idSchool = this.idSchool;
                    user.idRole = this.idRole || UserRoles.student;       
                    user.valid = 1;
                    user.mustChgPwd = this.mustChgPwd? 1 : 0;             
                    if (children) {
                        try {
                            const childrenUsernames = children.replace("[", "").replace("]", "").split(",");
                            childrenUsernames.forEach( (e, i) => childrenUsernames[i] = e.replace(/\"/g, "").replace(/\'/g, "").trim());
                            if (childrenUsernames.length) {
                                user._offspring = [];
                                childrenUsernames.forEach( (ch) => {
                                    const offspring = new OffspringModel();
                                    offspring.username = ch;
                                    user._offspring.push(offspring);
                                }); 
                            }
                        } catch(Ex) {     
                            console.log(Ex);
                            logErrors.push(Ex);                       
                        }
                    }
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