import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'; 
 
@Injectable()
export class ClassroomRestService {

    constructor(private http: HttpClient) {        
    }
   
    listCourses(idUser: number) {
        return this.http.get("@/api/course/list/"+idUser);
    }
    
    listUnitsCreated(idCourse: number) {
        return this.http.get("@/api/units/created/"+idCourse);
    }

    listUnitsAssigned(idCourse: number, idUser: number) {
        return this.http.get("@/api/units/assigned/"+idCourse+"?idUser="+idUser);
    }
}

