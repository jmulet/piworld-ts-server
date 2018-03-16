
        /* Changing or deleting this line will produce this entity to be out of sync */
        import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

        export class SubjectCategoryModel {
			id:number;
			idSubject:number;
			name:string;
			longname:string;
  
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
					'idSubject': new FormControl(this.idSubject),
					'name': new FormControl(this.name, Validators.required),
					'longname': new FormControl(this.longname, Validators.required),
});
            }
        }