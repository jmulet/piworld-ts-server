
        /* Changing or deleting this line will produce this entity to be out of sync */
        import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

        export class ActivityModel {
			id:number;
			levels:any;
			idSubject:number = 1;
			activity:any;
			activityType:string = "V";
			share:number = 2;
			createdBy:string;
			createdWhen:Date;
			description:any;
			difficulty:number;
			icon:string;
			params:any;
			counter:number = 0;
			sdr:number;
			sdd:Date;
  
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
					'levels': new FormControl(this.levels),
					'idSubject': new FormControl(this.idSubject, Validators.required),
					'activity': new FormControl(this.activity, Validators.required),
					'activityType': new FormControl(this.activityType),
					'share': new FormControl(this.share),
					'createdBy': new FormControl(this.createdBy, Validators.required),
					'createdWhen': new FormControl(this.createdWhen),
					'description': new FormControl(this.description),
					'difficulty': new FormControl(this.difficulty),
					'icon': new FormControl(this.icon),
					'params': new FormControl(this.params),
					'counter': new FormControl(this.counter),
					'sdr': new FormControl(this.sdr),
					'sdd': new FormControl(this.sdd),
});
            }
        }