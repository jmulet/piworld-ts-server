
        /* Changing or deleting this line will produce this entity to be out of sync */
        import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

        export class GroupsModel {
			id:number;
			name:string;
			idCourse:number = 0;
			gopts:any;
			thmcss:string;
			idUserCreator:number;
  
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
					'idCourse': new FormControl(this.idCourse),
					'gopts': new FormControl(this.gopts),
					'thmcss': new FormControl(this.thmcss),
					'idUserCreator': new FormControl(this.idUserCreator),
});
            }
        }