"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forms_1 = require("@angular/forms");
class ChallengesModel {
    constructor() {
        this.score = 0;
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
            'day': new forms_1.FormControl(this.day),
            'level': new forms_1.FormControl(this.level, forms_1.Validators.required),
            'formulation': new forms_1.FormControl(this.formulation, forms_1.Validators.required),
            'score': new forms_1.FormControl(this.score),
            'ranswer': new forms_1.FormControl(this.ranswer),
        });
    }
}
exports.ChallengesModel = ChallengesModel;
//# sourceMappingURL=ChallengesModel.js.map