"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forms_1 = require("@angular/forms");
class PdaBadgesModel {
    constructor() {
        this.rscore = 0;
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
            'idUser': new forms_1.FormControl(this.idUser),
            'idCreator': new forms_1.FormControl(this.idCreator),
            'idGroup': new forms_1.FormControl(this.idGroup),
            'type': new forms_1.FormControl(this.type),
            'day': new forms_1.FormControl(this.day, forms_1.Validators.required),
            'rscore': new forms_1.FormControl(this.rscore),
            'description': new forms_1.FormControl(this.description),
        });
    }
}
exports.PdaBadgesModel = PdaBadgesModel;
//# sourceMappingURL=PdaBadgesModel.js.map