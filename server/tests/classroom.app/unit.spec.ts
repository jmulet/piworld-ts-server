import 'es6-shim';
import 'reflect-metadata';

import * as chai from 'chai';

import { UnitModel, UnitVisibility } from '../../src/classroom.app/entities/UnitModel';
import { config } from '../../src/server.config';
import { TestConfig } from '../TestConfig';
import { AssignmentModel, AssignmentUsersModel } from '../../src/classroom.app/entities';

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


    it("creates a new unit /api/unit/ POST", async function () {
        let res = await this.agent.get('/api/group/created').query({idUser: 1});
        const groups = JSON.parse(res.text);
        this.idGroup = groups[0].id;
        const unit = new UnitModel();    
        unit.idGroup = this.idGroup;
        unit.visible = UnitVisibility.auto;
        unit.unit = "La unitat de la pera limonera";
    
        const asgn1 = new AssignmentModel();
        asgn1.applyToAll = 1;
        asgn1.idUser =1;
        asgn1.instructions = "aaaaa";
        asgn1.visible = 1;
        asgn1.postDate = new Date();
        asgn1.params = {};
 
        unit.assignments = [
            asgn1
        ]

        res = await this.agent.post('/api/units/').send(unit);
        const result = JSON.parse(res.text);
        expect(res).to.have.status(200);
        expect(result).to.have.property("id");
    })
    
    it("list created units /api/unit/listCreated GET", async function () {
        let res = await this.agent.get("/api/units/listCreated").query({ idGroup: this.idGroup });
        const result = JSON.parse(res.text);
        expect(result).to.have.length.gt(0);
        this.firstId = result[0].id;
    })

    it("list assigned units /api/unit/listAssigned GET", async function () {
        console.log("of group "+this.idGroup);
        let res = await this.agent.get("/api/units/listAssigned").query({ idGroup: this.idGroup, idUser: 1 });
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
 