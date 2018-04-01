"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forms_1 = require("@angular/forms");
class QuestionModel {
    constructor() {
        this.seconds = 0;
        this.score = 0;
        this.category = "g";
        this.level = 0;
        this.askTheory = 0;
        this.askHelp = 0;
        this.askAnswer = 0;
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
            'idAttempt': new forms_1.FormControl(this.idAttempt),
            'question': new forms_1.FormControl(this.question),
            'rightAnswer': new forms_1.FormControl(this.rightAnswer),
            'seconds': new forms_1.FormControl(this.seconds),
            'score': new forms_1.FormControl(this.score),
            'category': new forms_1.FormControl(this.category),
            'level': new forms_1.FormControl(this.level),
            'askTheory': new forms_1.FormControl(this.askTheory),
            'askHelp': new forms_1.FormControl(this.askHelp),
            'askAnswer': new forms_1.FormControl(this.askAnswer),
        });
    }
}
exports.QuestionModel = QuestionModel;
//# sourceMappingURL=QuestionModel.js.map