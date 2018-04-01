"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forms_1 = require("@angular/forms");
class CommentModel {
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
            'idUser': new forms_1.FormControl(this.idUser),
            'idActivity': new forms_1.FormControl(this.idActivity),
            'day': new forms_1.FormControl(this.day),
            'comment': new forms_1.FormControl(this.comment, forms_1.Validators.required),
        });
    }
}
exports.CommentModel = CommentModel;
//# sourceMappingURL=CommentModel.js.map