"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forms_1 = require("@angular/forms");
class NewsModel {
    constructor() {
        this.order = 0;
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
            'html': new forms_1.FormControl(this.html),
            'title': new forms_1.FormControl(this.title),
            'expires': new forms_1.FormControl(this.expires),
            'order': new forms_1.FormControl(this.order),
        });
    }
}
exports.NewsModel = NewsModel;
//# sourceMappingURL=NewsModel.js.map