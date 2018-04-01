"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forms_1 = require("@angular/forms");
class UserModel {
    constructor() {
        this.idSchool = 1;
        this.mustChgPwd = 0;
        this.valid = 1;
    }
    setObj(obj) {
        if (obj) {
            for (var key in obj) {
                this[key] = obj[key];
            }
        }
        return this;
    }
    toForm(fb) {
        return fb.group({
            'id': new forms_1.FormControl(this.id),
            'idSchool': new forms_1.FormControl(this.idSchool),
            'idRole': new forms_1.FormControl(this.idRole),
            'username': new forms_1.FormControl(this.username, forms_1.Validators.required),
            'fullname': new forms_1.FormControl(this.fullname, forms_1.Validators.required),
            'password': new forms_1.FormControl(this.password),
            'mustChgPwd': new forms_1.FormControl(this.mustChgPwd),
            'email': new forms_1.FormControl(this.email, forms_1.Validators.pattern("[a-zA-Z0-9._-]+[@]+[a-zA-Z0-9-]+[.]+[a-zA-Z]{2,6}")),
            'emailPassword': new forms_1.FormControl(this.emailPassword),
            'recovery': new forms_1.FormControl(this.recovery),
            'created': new forms_1.FormControl(this.created),
            'valid': new forms_1.FormControl(this.valid),
            'uopts': new forms_1.FormControl(this.uopts),
            'sdr': new forms_1.FormControl(this.sdr),
            'sdd': new forms_1.FormControl(this.sdd),
        });
    }
}
exports.UserModel = UserModel;
//# sourceMappingURL=UserModel.js.map