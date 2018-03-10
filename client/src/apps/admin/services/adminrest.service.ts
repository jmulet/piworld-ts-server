import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'; 
 
@Injectable()
export class AdminRestService {
    constructor(private http: HttpClient) {        
    }
     
    getSchools(){
        return this.http.get('@/api/school/list');
    }

    getUsersInSchool(idSchool: number, idRole?: number){
        return this.http.get('@/api/user/list?offspring=1&idSchool=' + idSchool + (idRole?("&filter=" + idRole):"") );
    }
}
