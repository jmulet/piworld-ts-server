
        /* Changing or deleting this line will produce this entity to be out of sync */
        import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

        export class NewsModel {
			id:number;
			html:string;
			title:string;
			expires:Date;
			order:number = 0;
  
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
					'html': new FormControl(this.html),
					'title': new FormControl(this.title),
					'expires': new FormControl(this.expires),
					'order': new FormControl(this.order),
});
            }
        }