
        /* Changing or deleting this line will produce this entity to be out of sync */
        import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

        export class BooksModel {
			id:number;
			bookCode:string;
			title:string;
			author:string;
			url:string;
			year:number;
			level:string;
			genre:string;
			img:string;
			key:number;
			allStudents:number;
			allTeachers:number;
  
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
					'bookCode': new FormControl(this.bookCode),
					'title': new FormControl(this.title),
					'author': new FormControl(this.author),
					'url': new FormControl(this.url),
					'year': new FormControl(this.year),
					'level': new FormControl(this.level),
					'genre': new FormControl(this.genre),
					'img': new FormControl(this.img),
					'key': new FormControl(this.key),
					'allStudents': new FormControl(this.allStudents),
					'allTeachers': new FormControl(this.allTeachers),
});
            }
        }