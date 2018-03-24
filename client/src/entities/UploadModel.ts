
        /* Changing or deleting this line will produce this entity to be out of sync */
        import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

        export class UploadModel {
			id:number;
			idSection:number;
			idUser:number;
			file:string;
			message:string;
			uploadDate:Date;
			score:number = 0;
			feedback:string;
  
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
					'idSection': new FormControl(this.idSection),
					'idUser': new FormControl(this.idUser),
					'file': new FormControl(this.file, Validators.required),
					'message': new FormControl(this.message, Validators.required),
					'uploadDate': new FormControl(this.uploadDate),
					'score': new FormControl(this.score),
					'feedback': new FormControl(this.feedback),
});
            }
        }