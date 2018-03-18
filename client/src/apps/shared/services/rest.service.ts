import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'; 
import { HolidayModel } from '../../../libs/entities/HolidayModel';

export interface LoginBodyModel {
    username: string; 
    password: string; 
    rememberme: boolean; 
    app: string; 
    path: string; 
}

@Injectable()
export class RestService {
    constructor(private http: HttpClient) {        
    }
    login(model: LoginBodyModel) {
        return this.http.post("*/login.htm", model);
    }
    logout() {
        return this.http.get("@/api/user/logout");
    }
    getUsers(idSchool?: number){
        return this.http.get("@/api/user/list" + (idSchool?("&idSchool="+idSchool):""));
    } 
    listSubjects() {
        return this.http.get("@/api/subject/list");
    }
}
