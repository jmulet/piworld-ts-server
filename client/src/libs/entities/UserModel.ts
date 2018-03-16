
        /* Changing or deleting this line will produce this entity to be out of sync */
        import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

        export class UserModel {
			id:number;
			idSchool:number = 1;
			idRole:number;
			username:string;
			fullname:string;
			password:string;
			mustChgPwd:any = 0;
			email:string;
			emailPassword:string;
			recovery:string;
			created:Date;
			valid:number = 1;
			uopts:any;
  
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
					'idSchool': new FormControl(this.idSchool),
					'idRole': new FormControl(this.idRole),
					'username': new FormControl(this.username, Validators.required),
					'fullname': new FormControl(this.fullname, Validators.required),
					'password': new FormControl(this.password),
					'mustChgPwd': new FormControl(this.mustChgPwd),
					'email': new FormControl(this.email, Validators.email),
					'emailPassword': new FormControl(this.emailPassword),
					'recovery': new FormControl(this.recovery),
					'created': new FormControl(this.created),
					'valid': new FormControl(this.valid),
					'uopts': new FormControl(this.uopts),
});
            }
        }