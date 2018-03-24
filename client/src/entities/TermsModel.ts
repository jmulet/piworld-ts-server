
        /* Changing or deleting this line will produce this entity to be out of sync */
        import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

        export class TermsModel {
			id:number;
			idSchool:number;
			year:number;
			term:number;
			fromDate:Date;
			toDate:Date;
  
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
					'idSchool': new FormControl(this.idSchool),
					'year': new FormControl(this.year),
					'term': new FormControl(this.term),
					'fromDate': new FormControl(this.fromDate),
					'toDate': new FormControl(this.toDate),
});
            }
        }