"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forms_1 = require("@angular/forms");
class OffspringModel {
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
            'idParent': new forms_1.FormControl(this.idParent),
            'idChild': new forms_1.FormControl(this.idChild),
        });
    }
}
exports.OffspringModel = OffspringModel;
//# sourceMappingURL=OffspringModel.js.map