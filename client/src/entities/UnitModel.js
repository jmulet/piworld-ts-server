"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forms_1 = require("@angular/forms");
class UnitModel {
    constructor() {
        this.idCourse = 0;
        this.order = 0;
        this.visible = 2;
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
            'idCourse': new forms_1.FormControl(this.idCourse),
            'unit': new forms_1.FormControl(this.unit, forms_1.Validators.required),
            'order': new forms_1.FormControl(this.order),
            'visible': new forms_1.FormControl(this.visible),
        });
    }
}
exports.UnitModel = UnitModel;
//# sourceMappingURL=UnitModel.js.map