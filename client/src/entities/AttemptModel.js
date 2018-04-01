"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forms_1 = require("@angular/forms");
class AttemptModel {
    constructor() {
        this.score = 0;
        this.level = 0;
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
            'idSectionAssign': new forms_1.FormControl(this.idSectionAssign),
            'idUser': new forms_1.FormControl(this.idUser),
            'attemptStart': new forms_1.FormControl(this.attemptStart),
            'attemptEnd': new forms_1.FormControl(this.attemptEnd),
            'done': new forms_1.FormControl(this.done),
            'score': new forms_1.FormControl(this.score),
            'level': new forms_1.FormControl(this.level),
        });
    }
}
exports.AttemptModel = AttemptModel;
//# sourceMappingURL=AttemptModel.js.map