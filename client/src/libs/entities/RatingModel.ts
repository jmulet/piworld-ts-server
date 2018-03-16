
        /* Changing or deleting this line will produce this entity to be out of sync */
        import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

        export class RatingModel {
			id:number;
			idActivity:number;
			idUser:number;
			rate:number = 3;
			vrate:number = 3;
  
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
					'idActivity': new FormControl(this.idActivity),
					'idUser': new FormControl(this.idUser),
					'rate': new FormControl(this.rate),
					'vrate': new FormControl(this.vrate),
});
            }
        }