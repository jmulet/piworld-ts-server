
        /* Changing or deleting this line will produce this entity to be out of sync */
        import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

        export class HolidayModel {
			id:number;
			idSchool:number;
			year:number = 2017;
			fromDate:Date;
			toDate:Date;
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
					'idSchool': new FormControl(this.idSchool),
					'year': new FormControl(this.year),
					'fromDate': new FormControl(this.fromDate),
					'toDate': new FormControl(this.toDate),
					'description': new FormControl(this.description),
});
            }
        }