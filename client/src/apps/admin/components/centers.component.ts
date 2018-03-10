 
import { Component, OnInit } from '@angular/core'; 
import { AdminRestService } from '../services/adminrest.service';
@Component({
    selector: 'app-component',
    template: require('./centers.component.html'),
    styleUrls: []
})
export class CentersComponent implements OnInit {
    cols2: { field: string; header: string; }[];
    users: any[];
    centerSelected: any;
    cols: { field: string; header: string; }[];
    idSchool: any;
    centers: any[];
    status: number;
    idRole: number;
    constructor(private arest: AdminRestService) {        
    }
    ngOnInit() {       
      this.idRole = 200;
      this.idSchool = window["pwCore"]["Config"]["user"]["idSchool"];
      this.reload();
    }
    reload(){
        this.arest.getSchools().subscribe((data: any[])=> {
            this.centers = data;
        });
        this.cols = [
            { field: 'id', header: 'Id' },
            { field: 'schoolName', header: 'Name' },
            { field: 'professorName', header: 'Teacher' },
            { field: 'professorEmail', header: 'Email' },
            { field: 'enrollPassword', header: 'Enroll Password' }
        ];

        this.cols2 = [
            { field: 'id', header: 'Id' },
            { field: 'username', header: 'Username' },
            { field: 'fullname', header: 'Fullname' },
            { field: 'email', header: 'email' } 
        ];
    }
    onRowSelected(row){
        this.centerSelected = row;
        this.arest.getUsersInSchool(row.id, this.idRole).subscribe((data: any[])=> {
            this.users = data;
        });
    }
}