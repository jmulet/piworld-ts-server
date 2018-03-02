import 'es6-shim';
import 'reflect-metadata';

import * as chai from 'chai';
import {GroupsModel} from '../../src/classroom.app/entities/GroupsModel';
import {config} from '../../src/server.config';
import { TestConfig } from '../TestConfig';
import { EnrollModel, UserModel } from '../../src/main.app/entities';
import { UserRoles } from '../../src/main.app/entities/UserModel';
import { GroupsSrv } from '../../src/classroom.app/services/GroupsSrv';
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe("Groups controller", function(){

    before(async function() {
        this.agent = chai.request.agent(TestConfig.uri); 
        // Do login 
        let res = await this.agent.post('/login.htm')
            .send({
                username: TestConfig.asUsername,
                password: TestConfig.asPassword,
                parents: TestConfig.parents
        }); 
        expect(res).to.have.status(200);
        expect(res).to.have.cookie(config.basePrefix + "pwsid");       
    });
 

    it("creates a new group /api/group/ POST", async function() {
        const g = GroupsSrv.fromData("my group", 2017, 1);    
      
        let res = await this.agent.post("/api/group/").send(g);
        const result = JSON.parse(res.text);
        expect(result).to.have.property("id");
    })

    it("lists groups /api/group/created GET", async function() {
        let res = await this.agent.get("/api/group/created").query({idUser: 1});
        const result = JSON.parse(res.text);
        expect(result).to.have.length.gt(0);
        this.firstId = result[0].id;
    })

    it("reads a group /api/group/ GET", async function() {
        let res = await this.agent.get("/api/group/").query({idGroup: this.firstId});
        const result = JSON.parse(res.text);
        expect(res).to.have.status(200);
        expect(result).property("id").to.be.equals(this.firstId);
    })

    /*
    it("deletes a group /api/group DELETE", async function() {
        let res = await this.agent.del("/api/group/").query({idGroup: this.firstId});
        const result = JSON.parse(res.text);
        expect(res).to.have.status(200);
        expect(res).not.to.have.property("id");
    })
    */
});