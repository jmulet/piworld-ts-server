"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forms_1 = require("@angular/forms");
class GroupsEnrollModel {
    constructor() {
        this.idRole = 200;
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
            'idGroup': new forms_1.FormControl(this.idGroup),
            'idUser': new forms_1.FormControl(this.idUser),
            'idRole': new forms_1.FormControl(this.idRole),
        });
    }
}
exports.GroupsEnrollModel = GroupsEnrollModel;
//# sourceMappingURL=GroupsEnrollModel.js.map