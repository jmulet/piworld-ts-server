import { ActivityModel, UnitModel } from "../entities";
import * as chai from 'chai';
import { UnitVisibility } from "../entities/UnitModel";

const expect = chai.expect;

export async function UnitTests(agent, options) {
    // Create a new activity
    const unit = new UnitModel();    
    unit.idGroup = 11;
    unit.visible = UnitVisibility.auto;
    unit.unit = "La unitat de la pera limonera";
    
}