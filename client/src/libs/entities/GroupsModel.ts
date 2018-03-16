
        /* Changing or deleting this line will produce this entity to be out of sync */
        import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

        export class GroupsModel {
			id:number;
			name:string;
			year:number;
			idCourse:number = 0;
			gopts:any;
			thmcss:string;
			_creator:number;
  
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
					'year': new FormControl(this.year),
					'idCourse': new FormControl(this.idCourse),
					'gopts': new FormControl(this.gopts),
					'thmcss': new FormControl(this.thmcss),
					'_creator': new FormControl(this._creator),
});
            }
        }