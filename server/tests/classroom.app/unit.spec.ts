import 'es6-shim';
import 'reflect-metadata';

import * as chai from 'chai';

import { UnitModel, UnitVisibility } from '../../src/classroom.app/entities/UnitModel';
import { config } from '../../src/server.config';
import { TestConfig } from '../TestConfig';
import { AssignmentModel, AssignmentUsersModel, CourseModel } from '../../src/classroom.app/entities';

const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
 



describe("unit controller", function () {

    before(async function () {
        this.agent = chai.request.agent(TestConfig.uri);
        // Do login 
        let res = await this.agent.post('/login.htm')
            .send({
                username: TestConfig.asUsername,
                password: TestConfig.asPassword,
                parents: 0
            });
        expect(res).to.have.status(200);
        expect(res).to.have.cookie(config.basePrefix + "pwsid");

    });


    it("creates a new course /api/course/ POST", async function () {
        const course = new CourseModel();
        course.idSubject = 1;
        course.idUserCreator = 1;
        course.courseLevel = 1;
        course.courseStudies = "BAT";
        course.description = "Description of the foo course";
        course.name = "Foo course";
        course.year = 2017;

        let res = await this.agent.post('/api/course/').send(course);
        this.course = JSON.parse(res.text);
        expect(res).to.have.status(200);
    });

    it("creates a new unit /api/unit/ POST", async function () {
        const unit = new UnitModel("Unitat didactica de programacio", this.course.id, UnitVisibility.auto);     
        
        const asgn1 = new AssignmentModel();
        asgn1.applyToAll = 1;
        asgn1.idUser =1;
        asgn1.instructions = "This the first entry of the unit programacio";
        asgn1.visible = 1;
        asgn1.postDate = new Date();
        asgn1.params = {};
 
        unit.assignments = [
            asgn1
        ]

        let res = await this.agent.post('/api/units/').send(unit);
        const result = JSON.parse(res.text);
        expect(res).to.have.status(200);
        expect(result).to.have.property("id");
    })
    
    it("list created units /api/unit/listCreated GET", async function () {
        let res = await this.agent.get("/api/units/listCreated").query({ idCourse: this.course.id });
        const result = JSON.parse(res.text);
        expect(result).to.have.length.gt(0);
        this.firstId = result[0].id;
    })

    it("list assigned units /api/unit/listAssigned GET", async function () {
        console.log("of course " + this.course.id);
        let res = await this.agent.get("/api/units/listAssigned").query({ idCourse: this.course.id , idUser: 1 });
        const result = JSON.parse(res.text);
        expect(result).to.have.length.gt(0);
        this.firstId = result[0].id;
    })

    /*
    it("deletes a unit /api/unit DELETE", async function () {
        let res = await this.agent.del("/api/units/").query({ idunit: this.firstId });
        const result = JSON.parse(res.text);
        expect(res).to.have.status(200);
        expect(res).not.to.have.property("id");
    })
    */
});
 