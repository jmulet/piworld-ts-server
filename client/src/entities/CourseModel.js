"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forms_1 = require("@angular/forms");
class CourseModel {
    constructor() {
        this.year = 2017;
        this.courseLevel = 1;
        this.courseStudies = "BAT";
        this.idSubject = 1;
        this.idUserCreator = 0;
        this.currentUnit = 0;
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
            'year': new forms_1.FormControl(this.year),
            'name': new forms_1.FormControl(this.name, forms_1.Validators.required),
            'description': new forms_1.FormControl(this.description),
            'courseLevel': new forms_1.FormControl(this.courseLevel),
            'courseStudies': new forms_1.FormControl(this.courseStudies),
            'idSubject': new forms_1.FormControl(this.idSubject),
            'idUserCreator': new forms_1.FormControl(this.idUserCreator),
            'currentUnit': new forms_1.FormControl(this.currentUnit),
            'enrollPassword': new forms_1.FormControl(this.enrollPassword),
            'sdr': new forms_1.FormControl(this.sdr),
            'sdd': new forms_1.FormControl(this.sdd),
        });
    }
}
exports.CourseModel = CourseModel;
//# sourceMappingURL=CourseModel.js.map