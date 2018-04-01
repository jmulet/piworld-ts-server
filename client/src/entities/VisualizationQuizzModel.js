"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forms_1 = require("@angular/forms");
class VisualizationQuizzModel {
    constructor() {
        this.penalty = 0;
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
            'idVisualization': new forms_1.FormControl(this.idVisualization),
            'answer': new forms_1.FormControl(this.answer),
            'rightAnwer': new forms_1.FormControl(this.rightAnwer),
            'isValid': new forms_1.FormControl(this.isValid),
            'penalty': new forms_1.FormControl(this.penalty),
        });
    }
}
exports.VisualizationQuizzModel = VisualizationQuizzModel;
//# sourceMappingURL=VisualizationQuizzModel.js.map