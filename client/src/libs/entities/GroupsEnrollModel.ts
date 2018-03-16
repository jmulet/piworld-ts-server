
        /* Changing or deleting this line will produce this entity to be out of sync */
        import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

        export class GroupsEnrollModel {
			id:number;
			idGroup:number;
			idUser:number;
			idRole:number = 200;
  
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
					'idGroup': new FormControl(this.idGroup),
					'idUser': new FormControl(this.idUser),
					'idRole': new FormControl(this.idRole),
});
            }
        }