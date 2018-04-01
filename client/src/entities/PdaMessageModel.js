"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forms_1 = require("@angular/forms");
class PdaMessageModel {
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
            'idCourse': new forms_1.FormControl(this.idCourse),
            'idUser': new forms_1.FormControl(this.idUser),
            'day': new forms_1.FormControl(this.day),
            'msg': new forms_1.FormControl(this.msg, forms_1.Validators.required),
            'isFor': new forms_1.FormControl(this.isFor),
        });
    }
}
exports.PdaMessageModel = PdaMessageModel;
//# sourceMappingURL=PdaMessageModel.js.map