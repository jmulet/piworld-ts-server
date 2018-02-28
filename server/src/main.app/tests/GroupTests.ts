import * as chai from 'chai';

import { GroupsModel } from '../entities/GroupsModel'; 

const expect = chai.expect;

export async function GroupTests(agent, options) {
    // Create a new group
    const g = new GroupsModel();    
    g.currentUnit = 0;
    g.groupLetter = "A"
    g.groupLevel = 1;
    g.groupStudies = "BATX";
    g.groupYear = 2017;
    g.idSubject = 1;
    g.idUserCreator = 1;

    console.log("Saving a group:");
    let res = await agent.post("/api/group/save").send(g);
    console.log("Result: ", JSON.stringify(res.text));
}