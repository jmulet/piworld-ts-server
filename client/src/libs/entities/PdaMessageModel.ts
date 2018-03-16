
        /* Changing or deleting this line will produce this entity to be out of sync */
        import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

        export class PdaMessageModel {
			id:number;
			idCourse:number;
			idUser:number;
			day:Date;
			msg:string;
			isFor:number;
  
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
					'idCourse': new FormControl(this.idCourse),
					'idUser': new FormControl(this.idUser),
					'day': new FormControl(this.day),
					'msg': new FormControl(this.msg, Validators.required),
					'isFor': new FormControl(this.isFor),
});
            }
        }