"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forms_1 = require("@angular/forms");
class SubjectCategoryModel {
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
            'idSubject': new forms_1.FormControl(this.idSubject),
            'name': new forms_1.FormControl(this.name, forms_1.Validators.required),
            'longname': new forms_1.FormControl(this.longname, forms_1.Validators.required),
        });
    }
}
exports.SubjectCategoryModel = SubjectCategoryModel;
//# sourceMappingURL=SubjectCategoryModel.js.map