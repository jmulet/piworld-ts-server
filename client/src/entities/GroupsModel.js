"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forms_1 = require("@angular/forms");
class GroupsModel {
    constructor() {
        this.idCourse = 0;
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
            'name': new forms_1.FormControl(this.name),
            'idCourse': new forms_1.FormControl(this.idCourse),
            'gopts': new forms_1.FormControl(this.gopts),
            'thmcss': new forms_1.FormControl(this.thmcss),
            'idUserCreator': new forms_1.FormControl(this.idUserCreator),
            'sdr': new forms_1.FormControl(this.sdr),
            'sdd': new forms_1.FormControl(this.sdd),
        });
    }
}
exports.GroupsModel = GroupsModel;
//# sourceMappingURL=GroupsModel.js.map