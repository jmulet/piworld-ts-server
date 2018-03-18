
import { Component, OnInit } from '@angular/core';
import { AdminRestService } from '../services/adminrest.service';
import { pwCore } from '../pw-core';
import { CourseModel } from '../../../libs/entities/CourseModel';
import { ConfirmationService } from 'primeng/api';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UnitModel } from '../../../libs/entities/UnitModel';
import { GroupsModel } from '../../../libs/entities/GroupsModel';
@Component({
    selector: 'app-course-component',
    template: require("./course.component.html"),
    styleUrls: []
})
export class CourseComponent implements OnInit {
    savingOrdering: boolean;
    groupEdtForm: FormGroup;
    groupEdt: GroupsModel;
    unitEdtForm: FormGroup;
    unitEdt: UnitModel;
    groups: GroupsModel[];
    units: UnitModel[];
    courseEdtForm: FormGroup;
    courseEdt: CourseModel;
    courses: any[];
    courseSelected: CourseModel;
    constructor(private arest: AdminRestService, private confirmationService: ConfirmationService,
        private fb: FormBuilder) {
    }
    ngOnInit() {
        this.reloadCourses(null);
    }
    reloadCourses(evt: any) {
        this.arest.listCourses(pwCore.User.id, true).subscribe((data: any[]) => {
            this.courses = data;
        });
    }
    removeCourse(course: CourseModel) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete course ' + course.name + ' and all associated users and data?',
            accept: () => {
                // This is a risky operation and should ask password
                this.arest.removeCourse(course.id).subscribe((data) =>  {
                    this.courseSelected = null;
                    this.reloadCourses(null);
                });
            }
        });
    }
    editCourse(course?: CourseModel) {
        this.courseEdt = new CourseModel().setObj(course);
        if (!this.courseEdt.id) {
            this.courseEdt.idUserCreator = pwCore.User.id;
        }
        this.courseEdtForm = this.courseEdt.toForm(this.fb);
    }
    createCourse() {
        this.editCourse();
    }
    reloadGroups() {
        this.arest.listGroups(this.courseSelected.id).subscribe((data: GroupsModel[]) => this.groups = data);
    }
    reloadUnits() {
        this.arest.listUnits(this.courseSelected.id).subscribe((data: UnitModel[]) => this.units = data);
    }
    onRowSelected(ev: any) {
        this.reloadUnits();
        this.reloadGroups();
    }
    createUnit() {
        this.editUnit();
    }
    createGroup() {
        this.editGroup();
    }
    removeUnit(unit: UnitModel) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete unit ' + unit.unit + ' and all associated users and data?',
            accept: () => {
                this.arest.removeUnit(unit.id).subscribe((data) =>  {
                    this.reloadUnits();
                });
            }
        });
    }
    removeGroup(group: GroupsModel) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete group ' + group.name + ' and all associated users and data?',
            accept: () => {
                this.arest.removeGroup(group.id).subscribe((data) =>  {
                    this.reloadGroups();
                });
            }
        });
    }
    editUnit(unit?: UnitModel) {
        this.unitEdt = new UnitModel().setObj(unit);
        if (!this.unitEdt.id) {
            this.unitEdt.idCourse = this.courseSelected.id;
            this.unitEdt.order = this.units.length + 1;
        }
        this.unitEdtForm = this.unitEdt.toForm(this.fb);
    }
    editGroup(group?: GroupsModel) {
        this.groupEdt = new GroupsModel().setObj(group);
        if (!this.groupEdt.id) {
            this.groupEdt.idUserCreator = this.courseSelected.idUserCreator;
            this.groupEdt.idCourse = this.courseSelected.id;
            this.groupEdt.gopts = {};
        }
        this.groupEdtForm = this.groupEdt.toForm(this.fb);
        this.groupEdtForm.addControl("_enrolls", new FormGroup(this.groupEdt["_enrolls"]));
    }
    private move(array: UnitModel[], index: number, offset: number) {
        const newIndex = index + offset
        if (newIndex > -1 && newIndex < array.length) {
            // Remove the element from the array
            const removedElement = array.splice(index, 1)[0];
            // At "newIndex", remove 0 elements, insert the removed element
            array.splice(newIndex, 0, removedElement)

            //Set order property
            array.forEach((e, i) => e.order = i+1);
            
            //Save into database
            const partials = this.units.map((u)=> { return {id: u.id, order: u.order} });
            this.savingOrdering = true;
            this.arest.saveUnits(partials).subscribe( (data)=> this.savingOrdering = false);
        }
    }
    moveUp(index: number) {
        this.move(this.units, index, -1);
    }
    moveDown(index: number) {
        this.move(this.units, index, 1);
    }
}