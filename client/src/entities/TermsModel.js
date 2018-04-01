"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forms_1 = require("@angular/forms");
class TermsModel {
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
            'idSchool': new forms_1.FormControl(this.idSchool),
            'year': new forms_1.FormControl(this.year),
            'term': new forms_1.FormControl(this.term),
            'fromDate': new forms_1.FormControl(this.fromDate),
            'toDate': new forms_1.FormControl(this.toDate),
        });
    }
}
exports.TermsModel = TermsModel;
//# sourceMappingURL=TermsModel.js.map