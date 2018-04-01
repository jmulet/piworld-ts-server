"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forms_1 = require("@angular/forms");
class VisualizationModel {
    constructor() {
        this.vscore = 0;
        this.vseconds = 0;
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
            'idAssignment': new forms_1.FormControl(this.idAssignment),
            'idLogins': new forms_1.FormControl(this.idLogins),
            'resource': new forms_1.FormControl(this.resource),
            'vscore': new forms_1.FormControl(this.vscore),
            'vseconds': new forms_1.FormControl(this.vseconds),
        });
    }
}
exports.VisualizationModel = VisualizationModel;
//# sourceMappingURL=VisualizationModel.js.map