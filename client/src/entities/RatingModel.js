"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forms_1 = require("@angular/forms");
class RatingModel {
    constructor() {
        this.rate = 3;
        this.vrate = 3;
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
            'rate': new forms_1.FormControl(this.rate),
            'vrate': new forms_1.FormControl(this.vrate),
        });
    }
}
exports.RatingModel = RatingModel;
//# sourceMappingURL=RatingModel.js.map