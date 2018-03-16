import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'; 
import { SchoolModel } from '../../../libs/entities/SchoolModel';
import { UserModel } from '../../../libs/entities/UserModel';
import { HolidayModel } from '../../../libs/entities/HolidayModel';
import { TermsModel } from '../../../libs/entities/TermsModel';
 
@Injectable()
export class AdminRestService {
    constructor(private http: HttpClient) {        
    }
     
    getSchools(){
        return this.http.get('@/api/school/list');
    }

    getUsersInSchool(idSchool: number, filter?: string){
        return this.http.get('@/api/user/list?offspring=1&idSchool=' + idSchool + (filter?("&filter=" + filter):"") );
    }

    saveSchool(center: SchoolModel) {
        return this.http.post('@/api/school/', center);
    }

    saveUser(user: UserModel) {
        return this.http.post('@/api/user/', user);
    }

    removeCenter(id: number) {
        return this.http.delete('@/api/school/'+id);
    }

    removeUser(id: number) {
        return this.http.delete('@/api/user/'+id);
    }

    importUsers(model: any) {
        return this.http.post("@/api/user/import", model);
    }

    listHolidays(idSchool: number, year?: number) {
        return this.http.get('@/api/school/holiday/list?idSchool=' + idSchool + (year?("&year=" + year):"") );
    }

    removeHoliday(idHoliday: number) {
        return this.http.delete('@/api/school/holiday/'+idHoliday );
    }

    saveHoliday(holiday: HolidayModel) {
        return this.http.post('@/api/school/holiday/', holiday);
    }

    listTerms(idTerm: number, year?: number) {
        return this.http.get('@/api/school/term/list?idSchool=' + idTerm + (year?("&year=" + year):"") );
    }

    removeTerm(idTerm: number) {
        return this.http.delete('@/api/school/term/'+idTerm );
    }

    saveTerm(term: TermsModel) {
        return this.http.post('@/api/school/term/', term);
    }
}

