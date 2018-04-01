"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forms_1 = require("@angular/forms");
class AnswerModel {
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
            'idQuestion': new forms_1.FormControl(this.idQuestion),
            'answer': new forms_1.FormControl(this.answer),
            'isCorrect': new forms_1.FormControl(this.isCorrect),
            'seconds': new forms_1.FormControl(this.seconds),
        });
    }
}
exports.AnswerModel = AnswerModel;
//# sourceMappingURL=AnswerModel.js.map