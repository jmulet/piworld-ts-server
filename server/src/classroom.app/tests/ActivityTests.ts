import { ActivityModel } from "../entities";
import * as chai from 'chai';

const expect = chai.expect;

export async function ActivityTests(agent, options) {
    // Create a new activity
    const activity = new ActivityModel();
    activity.activity = { "ca": "Prova", "es": "Prueba", "en": "Test" };
    activity.activityType = 'V';
    activity.createdBy = options.asUsername;
    activity.description = { "ca": "Desc prova", "es": "Descripcion prueba", "en": "Test description" }
    activity.difficulty = 1;
    activity.ytid = "YT:123123fsf";
    activity.idSubject = 1;
    activity.levels = ["1ESO", "2ESO"];

    console.log("New activity:");
    let res = await agent.post('/api/activity/save')
        .send(activity);

    console.log("Result:", JSON.parse(res.text));
    expect(res).to.have.status(200)
     
    console.log("Searching activities:");
    res = await agent.get('/api/activity/search').query({text: 'prova', limit: 2});
    const activities = JSON.parse(res.text);
    console.log("Result:", activities);
    
    console.log("Deleting one activity:", activities[1].id);
    res = await agent.delete('/api/activity/delete?idActivity='+activities[1].id);
    console.log("Result:", JSON.parse(res.text));
    
}