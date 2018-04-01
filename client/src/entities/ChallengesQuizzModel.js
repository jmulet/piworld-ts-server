"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forms_1 = require("@angular/forms");
class ChallengesQuizzModel {
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
            'idChallenge': new forms_1.FormControl(this.idChallenge),
            'idUser': new forms_1.FormControl(this.idUser),
            'idCourse': new forms_1.FormControl(this.idCourse),
            'when': new forms_1.FormControl(this.when),
            'answer': new forms_1.FormControl(this.answer),
            'valid': new forms_1.FormControl(this.valid),
        });
    }
}
exports.ChallengesQuizzModel = ChallengesQuizzModel;
//# sourceMappingURL=ChallengesQuizzModel.js.map