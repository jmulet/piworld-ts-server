"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forms_1 = require("@angular/forms");
class HolidayModel {
    constructor() {
        this.year = 2017;
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
            'fromDate': new forms_1.FormControl(this.fromDate),
            'toDate': new forms_1.FormControl(this.toDate),
            'description': new forms_1.FormControl(this.description),
        });
    }
}
exports.HolidayModel = HolidayModel;
//# sourceMappingURL=HolidayModel.js.map