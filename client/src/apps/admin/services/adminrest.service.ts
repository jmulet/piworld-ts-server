import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'; 
import { SchoolModel } from '../../../libs/entities/SchoolModel';
import { UserModel } from '../../../libs/entities/UserModel';
import { HolidayModel } from '../../../libs/entities/HolidayModel';
import { TermsModel } from '../../../libs/entities/TermsModel';
import { CourseModel } from '../../../libs/entities/CourseModel';
import { UnitModel } from '../../../libs/entities/UnitModel';
import { GroupsModel } from '../../../libs/entities/GroupsModel';
 
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
    
    listCourses(idUser: number, created: boolean) {
        return this.http.get('@/api/course/list/'+ idUser + ( created? "?created=1" : "") );
    }

    saveCourse(course: CourseModel) {
        return this.http.post('@/api/course/', course);
    }

    removeCourse(idCourse: number) {
        return this.http.delete('@/api/course/'+ idCourse);
    }

    listUnits(idCourse: number) {
        return this.http.get('@/api/units/list?idCourse='+ idCourse);
    }
    
    saveUnit(unit: UnitModel) {
        return this.http.post('@/api/units/', unit);
    }

    saveUnits(units: any[]) {
        return this.http.put('@/api/units/', units);
    }

    removeUnit(idUnit: number) {
        return this.http.delete('@/api/units/'+ idUnit);
    }

    listGroups(idCourse: number) {
        return this.http.get('@/api/group/list?idCourse='+ idCourse);
    }

    saveGroup(group: GroupsModel) {
        return this.http.post('@/api/group/', group);
    }

    removeGroup(idGroup: number) {
        return this.http.delete('@/api/group/'+ idGroup);
    }
}

