"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forms_1 = require("@angular/forms");
class BooksModel {
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
            'bookCode': new forms_1.FormControl(this.bookCode),
            'title': new forms_1.FormControl(this.title),
            'author': new forms_1.FormControl(this.author),
            'url': new forms_1.FormControl(this.url),
            'year': new forms_1.FormControl(this.year),
            'level': new forms_1.FormControl(this.level),
            'genre': new forms_1.FormControl(this.genre),
            'img': new forms_1.FormControl(this.img),
            'key': new forms_1.FormControl(this.key),
            'allStudents': new forms_1.FormControl(this.allStudents),
            'allTeachers': new forms_1.FormControl(this.allTeachers),
        });
    }
}
exports.BooksModel = BooksModel;
//# sourceMappingURL=BooksModel.js.map