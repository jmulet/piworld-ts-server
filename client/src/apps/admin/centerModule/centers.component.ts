 
import { Component, OnInit } from '@angular/core';  
import { FormBuilder, FormGroup, FormControl } from '@angular/forms'; 
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { pwCore } from '../pw-core';
import { UserModel } from '../../../entities/UserModel';
import { SchoolModel } from '../../../entities/SchoolModel';
import { RestApi } from '../../../rest/RestApi';
@Component({
    selector: 'app-component',
    template: require('./centers.component.html'),
    styleUrls: []
})
export class CentersComponent implements OnInit {
    amiRoot: any;
    centerToOpts: any;
    importToCenter: any;
    STUDENT_ROLE: any;
    allStudents: any[]; 
    PARENTS_ROLE: any;
    userEdtForm: FormGroup;
    userEdt: UserModel;
    serverValidationErrors: any;
    availableLangs: any;
    centerEdtForm: FormGroup;
    centerEdt: SchoolModel;
    cols2: { field: string; header: string; }[];
    users: any[];
    centerSelected: any;
    cols: { field: string; header: string; }[];
    idSchool: any;
    centers: any[];
    status: number;
    idRole: number;

    constructor(private rest: RestApi, private fb: FormBuilder,
                private confirmationService: ConfirmationService) {   

            const adminRole = pwCore.UserRoles.admin;        
            this.amiRoot = pwCore.User.idRole === adminRole;
    }
    ngOnInit() {   

      this.availableLangs = [];
      pwCore.SupportedLangs.forEach(element => {
          this.availableLangs.push({label: element, value: element});
      });;
      this.STUDENT_ROLE = pwCore.UserRoles.student;
      this.idRole = -1;
      this.PARENTS_ROLE = pwCore.UserRoles.parents;
      this.idSchool = pwCore.User.idSchool;
      
      this.reload(null);

      this.allStudents = [];
    }
    reload($event){
        this.rest.ApiSchool.listSchools().subscribe((data: any[])=> {
            this.centers = data.filter( (e) => e.schoolName !== "buildin_admin_school" );
        });
        this.cols = [
            { field: 'id', header: 'Id' },
            { field: 'schoolName', header: 'Name' },
            { field: 'professorName', header: 'Teacher' },
            { field: 'professorEmail', header: 'Email' },
            { field: 'language', header: 'Lang' },
            { field: 'enrollPassword', header: 'Enroll Password' },
            { field: 'canEnroll', header: 'Allow enroll' },
            { field: 'canPublish', header: 'Allow publish' }
        ];

        this.cols2 = [
            { field: 'id', header: 'Id' },
            { field: 'username', header: 'Username' },
            { field: 'fullname', header: 'Fullname' },
            { field: 'email', header: 'Email' } 
        ];
    }
    onRowSelected($event){    
        this.loadUsers(null);
    }
    loadUsers($event) {
        if (!this.centerSelected) {
            return;
        }
        this.rest.ApiUsers.listUsers(this.centerSelected.id, this.idRole>=0? ''+this.idRole : '*').subscribe((data: any[])=> {
            this.users = data;
        });
        this.rest.ApiUsers.listUsers(this.centerSelected.id, this.STUDENT_ROLE).subscribe((data: any[])=> {
            this.allStudents = data;
        });
    }
    editCenter(center?: any) {
        this.centerEdt = new SchoolModel().setObj(center);
        this.centerEdt.sopts = this.centerEdt.sopts || {year: 2017};
        this.centerEdtForm = this.centerEdt.toForm(this.fb);
    }
    removeCenter(center){
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete center ' + center.schoolName + ' and all associated users and data?',
            accept: () => {
                // This is a risky operation and should ask password
                this.rest.ApiSchool.deleteSchool(center.id).subscribe((data)=> {
                    this.centerSelected = null;
                    this.reload(null);
                });
            }
        });
    }
    createCenter(){
        this.editCenter();
    }    
    editUser(user?: UserModel) {
        if(!this.centerSelected) {
            return;
        }
        this.userEdt = new UserModel().setObj(user);
        this.userEdt.uopts = this.userEdt.uopts || {};
        this.userEdt.idSchool = this.userEdt.idSchool || this.centerSelected.id;       
        if (!this.userEdt.id) {
            this.userEdt.idRole = this.STUDENT_ROLE;
            this.userEdt.valid = 1;
            this.userEdt.idSchool = this.centerSelected.id;
        }
        this.userEdtForm = this.userEdt.toForm(this.fb);
        this.userEdtForm.addControl("_offspring", new FormControl(this.userEdt["_offspring"]));
        console.log(this.userEdtForm);
    }
    createUser() {
        this.editUser();
    }

    removeUser(user) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete user ' + user.fullname + ' and all associated data?',
            accept: () => {
                // This is a risky operation and should ask password
                this.rest.ApiUsers.deleteUser(user.id).subscribe((data)=> {
                    this.loadUsers(null);                    
                });
            }
        });
    }
    importUsers() {
        this.importToCenter = {...this.centerSelected};
    }
    centerOpts(center) {
        this.centerToOpts = {...center};
    }
    canDeleteUser(user) {
        return pwCore.User.id !== user.id && pwCore.User.idRole < user.idRole;
    }
}