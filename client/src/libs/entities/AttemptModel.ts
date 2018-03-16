
        /* Changing or deleting this line will produce this entity to be out of sync */
        import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

        export class AttemptModel {
			id:number;
			idSectionAssign:number;
			idUser:number;
			attemptStart:Date;
			attemptEnd:Date;
			done:number;
			score:number = 0;
			level:number = 0;
  
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
					'idSectionAssign': new FormControl(this.idSectionAssign),
					'idUser': new FormControl(this.idUser),
					'attemptStart': new FormControl(this.attemptStart),
					'attemptEnd': new FormControl(this.attemptEnd),
					'done': new FormControl(this.done),
					'score': new FormControl(this.score),
					'level': new FormControl(this.level),
});
            }
        }