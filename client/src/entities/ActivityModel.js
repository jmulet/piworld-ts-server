"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forms_1 = require("@angular/forms");
class ActivityModel {
    constructor() {
        this.idSubject = 1;
        this.activityType = "V";
        this.share = 2;
        this.difficulty = 0;
        this.counter = 0;
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
            'levels': new forms_1.FormControl(this.levels),
            'idSubject': new forms_1.FormControl(this.idSubject, forms_1.Validators.required),
            'activity': new forms_1.FormControl(this.activity, forms_1.Validators.required),
            'activityType': new forms_1.FormControl(this.activityType),
            'share': new forms_1.FormControl(this.share),
            'createdBy': new forms_1.FormControl(this.createdBy, forms_1.Validators.required),
            'createdWhen': new forms_1.FormControl(this.createdWhen),
            'description': new forms_1.FormControl(this.description),
            'difficulty': new forms_1.FormControl(this.difficulty),
            'icon': new forms_1.FormControl(this.icon),
            'params': new forms_1.FormControl(this.params),
            'counter': new forms_1.FormControl(this.counter),
            'sdr': new forms_1.FormControl(this.sdr),
            'sdd': new forms_1.FormControl(this.sdd),
        });
    }
}
exports.ActivityModel = ActivityModel;
//# sourceMappingURL=ActivityModel.js.map