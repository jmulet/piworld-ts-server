
        /* Changing or deleting this line will produce this entity to be out of sync */
        import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

        export class ChallengesModel {
			id:number;
			day:Date;
			level:string;
			formulation:string;
			score:number = 0;
			ranswer:string;
  
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
					'day': new FormControl(this.day),
					'level': new FormControl(this.level, Validators.required),
					'formulation': new FormControl(this.formulation, Validators.required),
					'score': new FormControl(this.score),
					'ranswer': new FormControl(this.ranswer),
});
            }
        }