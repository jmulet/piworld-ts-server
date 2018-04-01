"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forms_1 = require("@angular/forms");
class SchoolModel {
    constructor() {
        this.language = "en";
        this.canEnroll = 0;
        this.canPublish = 1;
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
            'schoolName': new forms_1.FormControl(this.schoolName, forms_1.Validators.required),
            'professorName': new forms_1.FormControl(this.professorName, forms_1.Validators.required),
            'professorEmail': new forms_1.FormControl(this.professorEmail, forms_1.Validators.pattern("[a-zA-Z0-9._-]+[@]+[a-zA-Z0-9-]+[.]+[a-zA-Z]{2,6}")),
            'language': new forms_1.FormControl(this.language),
            'enrollPassword': new forms_1.FormControl(this.enrollPassword),
            'canEnroll': new forms_1.FormControl(this.canEnroll),
            'canPublish': new forms_1.FormControl(this.canPublish),
            'sopts': new forms_1.FormControl(this.sopts),
            'sdr': new forms_1.FormControl(this.sdr),
            'sdd': new forms_1.FormControl(this.sdd),
        });
    }
}
exports.SchoolModel = SchoolModel;
//# sourceMappingURL=SchoolModel.js.map