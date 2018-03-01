import 'es6-shim';
import 'reflect-metadata';

import * as chai from 'chai';

import { ActivityModel } from '../../src/classroom.app/entities';
import { config } from '../../src/server.config';
import { TestConfig } from '../TestConfig';

const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
 

describe("activity controller", function () {

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


    it("creates a new activity /api/activity/ POST", async function () {

        const activity = new ActivityModel();
        activity.activity = { "ca": "Prova", "es": "Prueba", "en": "Test" };
        activity.activityType = 'V';
        activity.createdBy = TestConfig.asUsername;
        activity.description = { "ca": "Desc prova", "es": "Descripcion prueba", "en": "Test description" }
        activity.difficulty = 1;
        activity.ytid = "YT:123123fsf";
        activity.idSubject = 1;
        activity.levels = ["1ESO", "2ESO"];

        const res = await this.agent.post('/api/activity/').send(activity);
        const result = JSON.parse(res.text);
        expect(res).to.have.status(200);
        expect(result).to.have.property("id");
    })

    it("search activities /api/activity/search GET", async function () {
        let res = await this.agent.get("/api/activity/search").query({ text: "desc", limit: 2 });
        const result = JSON.parse(res.text);
        expect(result).to.have.length.gt(0);
        this.firstId = result[0].id;
    })

    it("deletes a activity /api/activity DELETE", async function () {
        let res = await this.agent.del("/api/activity/").query({ idActivity: this.firstId });
        const result = JSON.parse(res.text);
        expect(res).to.have.status(200);
        expect(res).not.to.have.property("id");
    })
});
 