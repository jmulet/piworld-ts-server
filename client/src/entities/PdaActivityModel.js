"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forms_1 = require("@angular/forms");
class PdaActivityModel {
    constructor() {
        this.trimestre = 1;
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
            'idCreator': new forms_1.FormControl(this.idCreator),
            'idGroup': new forms_1.FormControl(this.idGroup),
            'trimestre': new forms_1.FormControl(this.trimestre),
            'day': new forms_1.FormControl(this.day),
            'weight': new forms_1.FormControl(this.weight),
            'category': new forms_1.FormControl(this.category),
            'formula': new forms_1.FormControl(this.formula),
            'visible': new forms_1.FormControl(this.visible),
        });
    }
}
exports.PdaActivityModel = PdaActivityModel;
//# sourceMappingURL=PdaActivityModel.js.map