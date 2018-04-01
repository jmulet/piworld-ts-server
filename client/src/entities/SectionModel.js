"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forms_1 = require("@angular/forms");
class SectionModel {
    constructor() {
        this.order = 0;
        this.maxAttempts = 0;
        this.applyToAll = 0;
        this.visible = 1;
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
            'idUnit': new forms_1.FormControl(this.idUnit),
            'idActivity': new forms_1.FormControl(this.idActivity),
            'idUserCreator': new forms_1.FormControl(this.idUserCreator),
            'postDate': new forms_1.FormControl(this.postDate),
            'order': new forms_1.FormControl(this.order),
            'fromDate': new forms_1.FormControl(this.fromDate),
            'toDate': new forms_1.FormControl(this.toDate),
            'maxAttempts': new forms_1.FormControl(this.maxAttempts),
            'instructions': new forms_1.FormControl(this.instructions),
            'applyToAll': new forms_1.FormControl(this.applyToAll),
            'params': new forms_1.FormControl(this.params),
            'visible': new forms_1.FormControl(this.visible),
            'sdr': new forms_1.FormControl(this.sdr),
            'sdd': new forms_1.FormControl(this.sdd),
        });
    }
}
exports.SectionModel = SectionModel;
//# sourceMappingURL=SectionModel.js.map