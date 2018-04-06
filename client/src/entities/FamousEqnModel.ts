
        /* Changing or deleting this line will produce this entity to be out of sync */
        import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

        export class FamousEqnModel {
			id:number;
			idUserCreator:number;
			title:string;
			eqn:string;
			url:string;
  
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
					'idUserCreator': new FormControl(this.idUserCreator),
					'title': new FormControl(this.title),
					'eqn': new FormControl(this.eqn),
					'url': new FormControl(this.url),
});
            }
        }