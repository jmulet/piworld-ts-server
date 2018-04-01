"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forms_1 = require("@angular/forms");
class SubjectModel {
    constructor() {
        this.name = "";
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
            'name': new forms_1.FormControl(this.name, forms_1.Validators.required),
            'longname': new forms_1.FormControl(this.longname, forms_1.Validators.required),
        });
    }
}
exports.SubjectModel = SubjectModel;
//# sourceMappingURL=SubjectModel.js.map