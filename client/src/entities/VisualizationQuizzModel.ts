
        /* Changing or deleting this line will produce this entity to be out of sync */
        import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

        export class VisualizationQuizzModel {
			id:number;
			idVisualization:number;
			answer:string;
			rightAnwer:string;
			isValid:number;
			penalty:number = 0;
  
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
					'idVisualization': new FormControl(this.idVisualization),
					'answer': new FormControl(this.answer),
					'rightAnwer': new FormControl(this.rightAnwer),
					'isValid': new FormControl(this.isValid),
					'penalty': new FormControl(this.penalty),
});
            }
        }