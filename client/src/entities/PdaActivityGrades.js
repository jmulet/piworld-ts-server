"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forms_1 = require("@angular/forms");
class PdaActivityGrades {
    constructor() {
        this.grade = -10;
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
            'idActivity': new forms_1.FormControl(this.idActivity),
            'idUser': new forms_1.FormControl(this.idUser),
            'grade': new forms_1.FormControl(this.grade),
        });
    }
}
exports.PdaActivityGrades = PdaActivityGrades;
//# sourceMappingURL=PdaActivityGrades.js.map