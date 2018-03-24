
        /* Changing or deleting this line will produce this entity to be out of sync */
        import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

        export class CommentModel {
			id:number;
			idUser:number;
			idActivity:number;
			day:Date;
			comment:string;
  
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
					'idActivity': new FormControl(this.idActivity),
					'day': new FormControl(this.day),
					'comment': new FormControl(this.comment, Validators.required),
});
            }
        }