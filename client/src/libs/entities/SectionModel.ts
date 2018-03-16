
        /* Changing or deleting this line will produce this entity to be out of sync */
        import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

        export class SectionModel {
			id:number;
			idUnit:number;
			idActivity:number;
			idUserCreator:number;
			postDate:Date;
			order:number = 0;
			fromDate:Date;
			toDate:Date;
			maxAttempts:number = 0;
			instructions:string;
			applyToAll:number = 0;
			params:any;
			visible:number = 1;
  
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
					'idUnit': new FormControl(this.idUnit),
					'idActivity': new FormControl(this.idActivity),
					'idUserCreator': new FormControl(this.idUserCreator),
					'postDate': new FormControl(this.postDate),
					'order': new FormControl(this.order),
					'fromDate': new FormControl(this.fromDate),
					'toDate': new FormControl(this.toDate),
					'maxAttempts': new FormControl(this.maxAttempts),
					'instructions': new FormControl(this.instructions),
					'applyToAll': new FormControl(this.applyToAll),
					'params': new FormControl(this.params),
					'visible': new FormControl(this.visible),
});
            }
        }