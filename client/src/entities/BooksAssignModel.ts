
        /* Changing or deleting this line will produce this entity to be out of sync */
        import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

        export class BooksAssignModel {
			id:number;
			idBook:number;
			idCourse:number;
			expires:Date;
  
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
					'idBook': new FormControl(this.idBook),
					'idCourse': new FormControl(this.idCourse),
					'expires': new FormControl(this.expires),
});
            }
        }