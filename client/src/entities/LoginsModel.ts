
        /* Changing or deleting this line will produce this entity to be out of sync */
        import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

        export class LoginsModel {
			id:number;
			idUser:number;
			parents:number = 0;
			ip:string;
			login:Date;
			logout:Date;
  
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
					'parents': new FormControl(this.parents),
					'ip': new FormControl(this.ip),
					'login': new FormControl(this.login),
					'logout': new FormControl(this.logout),
});
            }
        }