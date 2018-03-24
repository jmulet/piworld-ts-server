
        /* Changing or deleting this line will produce this entity to be out of sync */
        import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

        export class BadgesModel {
			id:number;
			idUser:number;
			idCreator:number;
			idCourse:number;
			type:number;
			day:Date;
			rscore:number = 0;
  
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
					'idUser': new FormControl(this.idUser),
					'idCreator': new FormControl(this.idCreator),
					'idCourse': new FormControl(this.idCourse),
					'type': new FormControl(this.type),
					'day': new FormControl(this.day, Validators.required),
					'rscore': new FormControl(this.rscore),
});
            }
        }