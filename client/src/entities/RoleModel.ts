
        /* Changing or deleting this line will produce this entity to be out of sync */
        import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

        export class RoleModel {
			id:number;
			name:string;
			idRoleParent:number;
			idUserCreator:number = 1;
			scope:string;
			description:string;
  
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
					'name': new FormControl(this.name),
					'idRoleParent': new FormControl(this.idRoleParent),
					'idUserCreator': new FormControl(this.idUserCreator),
					'scope': new FormControl(this.scope),
					'description': new FormControl(this.description),
});
            }
        }