
        /* Changing or deleting this line will produce this entity to be out of sync */
        import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

        export class UnitModel {
			id:number;
			idCourse:number = 0;
			unit:string;
			order:number = 0;
			visible:number = 2;
  
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
					'idCourse': new FormControl(this.idCourse),
					'unit': new FormControl(this.unit, Validators.required),
					'order': new FormControl(this.order),
					'visible': new FormControl(this.visible),
});
            }
        }