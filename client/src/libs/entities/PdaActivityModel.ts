
        /* Changing or deleting this line will produce this entity to be out of sync */
        import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

        export class PdaActivityModel {
			id:number;
			idCreator:number;
			idGroup:number;
			trimestre:number = 1;
			day:Date;
			weight:number;
			category:string;
			formula:string;
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
					'idCreator': new FormControl(this.idCreator),
					'idGroup': new FormControl(this.idGroup),
					'trimestre': new FormControl(this.trimestre),
					'day': new FormControl(this.day),
					'weight': new FormControl(this.weight),
					'category': new FormControl(this.category),
					'formula': new FormControl(this.formula),
					'visible': new FormControl(this.visible),
});
            }
        }