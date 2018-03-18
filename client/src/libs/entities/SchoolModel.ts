
        /* Changing or deleting this line will produce this entity to be out of sync */
        import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

        export class SchoolModel {
			id:number;
			schoolName:string;
			professorName:string;
			professorEmail:string;
			language:string = "en";
			enrollPassword:string;
			canEnroll:number = 0;
			canPublish:number = 1;
			sopts:any;
  
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
					'schoolName': new FormControl(this.schoolName, Validators.required),
					'professorName': new FormControl(this.professorName, Validators.required),
					'professorEmail': new FormControl(this.professorEmail, Validators.pattern("[a-zA-Z0-9._-]+[@]+[a-zA-Z0-9-]+[.]+[a-zA-Z]{2,6}")),
					'language': new FormControl(this.language),
					'enrollPassword': new FormControl(this.enrollPassword),
					'canEnroll': new FormControl(this.canEnroll),
					'canPublish': new FormControl(this.canPublish),
					'sopts': new FormControl(this.sopts),
});
            }
        }