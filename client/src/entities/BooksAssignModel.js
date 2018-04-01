"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forms_1 = require("@angular/forms");
class BooksAssignModel {
    constructor() {
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
            'idBook': new forms_1.FormControl(this.idBook),
            'idCourse': new forms_1.FormControl(this.idCourse),
            'expires': new forms_1.FormControl(this.expires),
        });
    }
}
exports.BooksAssignModel = BooksAssignModel;
//# sourceMappingURL=BooksAssignModel.js.map