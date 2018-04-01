"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forms_1 = require("@angular/forms");
class SectionAssignModel {
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
            'idSection': new forms_1.FormControl(this.idSection),
            'idGroup': new forms_1.FormControl(this.idGroup),
        });
    }
}
exports.SectionAssignModel = SectionAssignModel;
//# sourceMappingURL=SectionAssignModel.js.map