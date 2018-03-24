import * as bcrypt from 'bcrypt';
import { Inject, Service } from 'typedi';

import { config } from '../../server.config';
import { SchoolModel } from '../entities/SchoolModel';
import { UserModel, UserRoles } from '../entities/UserModel';
import { SchoolSrv } from './SchoolSrv';
import { UserSrv } from './UserSrv';
import { SubjectSrv } from './SubjectSrv';
import { SubjectModel } from '../entities/SubjectModel';
import { ActivitySrv } from '../../classroom.app/services/ActivitySrv';

@Service()
export class BootstrapSrv {

    private static BUILDIN_SCHOOLNAME = "buildin_admin_school";

    @Inject()
    schoolSrv: SchoolSrv;

    @Inject()
    userSrv: UserSrv;

    @Inject()
    subjectSrv: SubjectSrv;

    @Inject()
    activitySrv: ActivitySrv;

    async doChecks() {
        let response = { errors: "" };

        try {
            let school = await this.schoolSrv.findBySchoolName(BootstrapSrv.BUILDIN_SCHOOLNAME);
            if (!school) {
                school = new SchoolModel();
                school.schoolName = BootstrapSrv.BUILDIN_SCHOOLNAME;
                school.canEnroll = 0;
                school.canPublish = 0;        
            }
            school.professorName = config.admin.username;
            school.professorEmail = config.admin.email;
            school.language = config.admin.lang;
            // console.log("> Saving school ", school);
            const saved = await this.schoolSrv.save(school);
            // console.log("! Done");

            let user = await this.userSrv.findByUsername(config.admin.username);
            if (!user) {
                user = new UserModel();
                user.username = config.admin.username;
                user.created = new Date();
                user.mustChgPwd = 0;
                user.idRole = UserRoles.admin;
                user.uopts = {};
            }
            user.idSchool = school.id;
            user.fullname = "Administrator";
            user.email = config.admin.email;
            user.emailPassword = config.admin.emailPassword;            
            const hash = await bcrypt.hash(config.admin.password, 10);
            user.password = hash;
            // console.log("> Saving user", user);
            const userSaved = await this.userSrv.save(user);
            // console.log("! Done");

            // Create default Subjects
            const subjects = await this.subjectSrv.list();
            if (!subjects.length) {
                const SUBJECTS = [
                    {short: "MAT", long:"Mathematics"}, 
                    {short: "FQ", long:"Physics & Chemistry"}, 
                    {short: "Biology", long:"Biology"}
                ];
                SUBJECTS.forEach((s)=> {
                    let subject = SubjectSrv.fromData(s.short, s.long);
                    this.subjectSrv.save(subject);
                });
            };


            // Create default Activities 
            /// id=1 --> basic html section
            let entity = await this.activitySrv.activityRepository.findOne({id: 1});
            if (!entity) {
                entity = ActivitySrv.fromData("*", 1, "buildin_section_html", "BI_HTML", 0, config.admin.username);
                entity.id = 1;
                await this.activitySrv.save(entity);
            }
            entity = await this.activitySrv.activityRepository.findOne({id: 2});
            if (!entity) {
                entity = ActivitySrv.fromData("*", 1, "buildin_section_video", "BI_VIDEO", 0, config.admin.username);
                entity.id = 2;
                await this.activitySrv.save(entity);
            }
            entity = await this.activitySrv.activityRepository.findOne({id: 3});
            if (!entity) {
                entity = ActivitySrv.fromData("*", 1, "buildin_section_upload", "BI_UPLOAD", 0, config.admin.username);
                entity.id = 3;
                await this.activitySrv.save(entity);
            }

        } catch (Ex) {
            response.errors = Ex;
        }

        return response;
    }

}