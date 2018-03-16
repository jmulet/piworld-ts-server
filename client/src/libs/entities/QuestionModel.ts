
        /* Changing or deleting this line will produce this entity to be out of sync */
        import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

        export class QuestionModel {
			id:number;
			idAttempt:number;
			question:string;
			rightAnswer:string;
			seconds:number = 0;
			score:number = 0;
			category:string = "g";
			level:number = 0;
			askTheory:number = 0;
			askHelp:number = 0;
			askAnswer:number = 0;
  
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
					'idAttempt': new FormControl(this.idAttempt),
					'question': new FormControl(this.question),
					'rightAnswer': new FormControl(this.rightAnswer),
					'seconds': new FormControl(this.seconds),
					'score': new FormControl(this.score),
					'category': new FormControl(this.category),
					'level': new FormControl(this.level),
					'askTheory': new FormControl(this.askTheory),
					'askHelp': new FormControl(this.askHelp),
					'askAnswer': new FormControl(this.askAnswer),
});
            }
        }