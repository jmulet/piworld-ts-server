
        /* Changing or deleting this line will produce this entity to be out of sync */
        import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

        export class AnswerModel {
			id:number;
			idQuestion:number;
			answer:string;
			isCorrect:number;
			seconds:number;
  
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
					'idQuestion': new FormControl(this.idQuestion),
					'answer': new FormControl(this.answer),
					'isCorrect': new FormControl(this.isCorrect),
					'seconds': new FormControl(this.seconds),
});
            }
        }