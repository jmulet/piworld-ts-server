
        /* Changing or deleting this line will produce this entity to be out of sync */
        import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

        export class LevelsModel {
			id:number;
			level:number;
			studies:string;
  
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
					'level': new FormControl(this.level),
					'studies': new FormControl(this.studies),
});
            }
        }