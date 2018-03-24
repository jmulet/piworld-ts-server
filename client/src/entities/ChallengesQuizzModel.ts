
        /* Changing or deleting this line will produce this entity to be out of sync */
        import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

        export class ChallengesQuizzModel {
			id:number;
			idChallenge:number;
			idUser:number;
			idCourse:number;
			when:Date;
			answer:string;
			valid:number;
  
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
					'idChallenge': new FormControl(this.idChallenge),
					'idUser': new FormControl(this.idUser),
					'idCourse': new FormControl(this.idCourse),
					'when': new FormControl(this.when),
					'answer': new FormControl(this.answer),
					'valid': new FormControl(this.valid),
});
            }
        }