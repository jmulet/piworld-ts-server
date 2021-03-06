
        /* Changing or deleting this line will produce this entity to be out of sync */
        import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

        export class CourseModel {
			id:number;
			idLevel:number;
			idSubject:number = 1;
			idUserCreator:number = 0;
			year:number = 2017;
			name:string;
			description:string;
			currentUnit:number = 0;
			enrollPassword:string;
			sdr:number;
			sdd:Date;
  
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
					'idLevel': new FormControl(this.idLevel),
					'idSubject': new FormControl(this.idSubject),
					'idUserCreator': new FormControl(this.idUserCreator),
					'year': new FormControl(this.year),
					'name': new FormControl(this.name, Validators.required),
					'description': new FormControl(this.description),
					'currentUnit': new FormControl(this.currentUnit),
					'enrollPassword': new FormControl(this.enrollPassword),
					'sdr': new FormControl(this.sdr),
					'sdd': new FormControl(this.sdd),
});
            }
        }