
        /* Changing or deleting this line will produce this entity to be out of sync */
        import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

        export class CourseModel {
			id:number;
			year:number;
			name:string;
			description:string;
			courseLevel:number = 1;
			courseStudies:string = "BAT";
			idSubject:number = 1;
			idUserCreator:number = 0;
			currentUnit:number = 0;
			enrollPassword:string;
  
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
					'year': new FormControl(this.year),
					'name': new FormControl(this.name, Validators.required),
					'description': new FormControl(this.description),
					'courseLevel': new FormControl(this.courseLevel),
					'courseStudies': new FormControl(this.courseStudies),
					'idSubject': new FormControl(this.idSubject),
					'idUserCreator': new FormControl(this.idUserCreator),
					'currentUnit': new FormControl(this.currentUnit),
					'enrollPassword': new FormControl(this.enrollPassword),
});
            }
        }