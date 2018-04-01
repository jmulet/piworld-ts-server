"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forms_1 = require("@angular/forms");
class UploadModel {
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
            'idSection': new forms_1.FormControl(this.idSection),
            'idUser': new forms_1.FormControl(this.idUser),
            'file': new forms_1.FormControl(this.file, forms_1.Validators.required),
            'message': new forms_1.FormControl(this.message, forms_1.Validators.required),
            'uploadDate': new forms_1.FormControl(this.uploadDate),
            'score': new forms_1.FormControl(this.score),
            'feedback': new forms_1.FormControl(this.feedback),
        });
    }
}
exports.UploadModel = UploadModel;
//# sourceMappingURL=UploadModel.js.map