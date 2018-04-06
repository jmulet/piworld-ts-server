
        /* Changing or deleting this line will produce this entity to be out of sync */
        import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

        export class FamousQuoteModel {
			id:number;
			idUserCreator:number;
			quote:string;
			author:string;
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
					'quote': new FormControl(this.quote),
					'author': new FormControl(this.author),
					'url': new FormControl(this.url),
});
            }
        }