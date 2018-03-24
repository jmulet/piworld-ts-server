
        /* Changing or deleting this line will produce this entity to be out of sync */
        import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

        export class VisualizationModel {
			id:number;
			idActivity:number;
			idAssignment:number;
			idLogins:number;
			resource:string;
			vscore:number = 0;
			vseconds:number = 0;
  
            constructor() {             
            }

            setObj(obj: any) {
                if (obj) {
                    for (var key in obj) {
                        this[key] = obj[key];
                    }
                }
                return this;
            }

            toForm(fb: FormBuilder) {
                return fb.group({
					'id': new FormControl(this.id),
					'idActivity': new FormControl(this.idActivity),
					'idAssignment': new FormControl(this.idAssignment),
					'idLogins': new FormControl(this.idLogins),
					'resource': new FormControl(this.resource),
					'vscore': new FormControl(this.vscore),
					'vseconds': new FormControl(this.vseconds),
});
            }
        }