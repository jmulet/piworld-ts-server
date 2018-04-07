
        /* Changing or deleting this line will produce this entity to be out of sync */
        import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

        export class RolePermissionsModel {
			id:number;
			idRole:number;
			idCapability:number;
			value:number;
  
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
					'idRole': new FormControl(this.idRole),
					'idCapability': new FormControl(this.idCapability),
					'value': new FormControl(this.value),
});
            }
        }