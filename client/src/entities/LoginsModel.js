"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forms_1 = require("@angular/forms");
class LoginsModel {
    constructor() {
        this.parents = 0;
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
            'idUser': new forms_1.FormControl(this.idUser),
            'parents': new forms_1.FormControl(this.parents),
            'ip': new forms_1.FormControl(this.ip),
            'login': new forms_1.FormControl(this.login),
            'logout': new forms_1.FormControl(this.logout),
        });
    }
}
exports.LoginsModel = LoginsModel;
//# sourceMappingURL=LoginsModel.js.map