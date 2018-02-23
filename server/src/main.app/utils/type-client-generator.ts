import { MetadataStorage } from 'class-validator';
import * as fs from 'fs';
import * as path from 'path';
import { getConnection, getFromContainer } from 'typeorm';
import { ColumnMetadata } from 'typeorm/metadata/ColumnMetadata';
import { EntityMetadata } from 'typeorm/metadata/EntityMetadata';

import * as Entities from '../entities';
import { config } from '../../server.config';

export function typeClientGenerator() {

    console.log("Entities", Entities);

    // Inspect metadata from entities --> Generate client entities .js files
    getConnection().entityMetadatas.forEach((entityMetadata: EntityMetadata) => {
        console.log("**** Entity: ", entityMetadata.name);
        let entity = {
            properties: [],
            defaultObject: {}
        }

        entityMetadata.columns.forEach((columnMetadata: ColumnMetadata) => {
            /*
            console.log("\tColumn: ", columnMetadata.propertyName);
            console.log("\tType: ", columnMetadata.type);
            console.log("\tNullable: ", columnMetadata.isNullable);
            console.log("\tAutogenerated: ", columnMetadata.isGenerated);
            console.log("\tDefault value: ", columnMetadata.default, typeof(columnMetadata.default));
            */
            entity.properties.push({
                name: columnMetadata.propertyName, type: columnMetadata.type, nullable: columnMetadata.isGenerated,
                generated: columnMetadata.isGenerated
            })
            entity.defaultObject[columnMetadata.propertyName] = columnMetadata.default !== undefined ? columnMetadata.default : null;
        });

        // Now load validation metadata
       
        const clazz = Entities[entityMetadata.name];
       
        const validationMeta = getFromContainer(MetadataStorage).getTargetValidationMetadatas(clazz, config.database);
        validationMeta.forEach( (e) => {
            const property = entity.properties.filter( (x) => x.name === e.propertyName )[0];
       
            if (property) {
                if (!property.validation) {
                    property.validation = [];
                }
                let type = e.type;
                if (type === "customValidation") {
                    if(e.constraintCls) {
                        type = e.constraintCls.name;
                    }
                }
                if (type !== "customValidation" && type !== "conditionalValidator") {
                    property.validation.push({type: type, constraints: e.constraints});
                }
            }
        });

        let builder = [];
        builder.push("var pwApp = window.pwApp || {};");
        builder.push("pwApp.entities = pwApp.entities || {};");
        builder.push("pwApp.entities['" + entityMetadata.name + "'] = " + JSON.stringify(entity, null, 2) + ";");
        var directory = path.join(global.__publicDir, "../../src/libs/entities/" + entityMetadata.name + ".js");
        fs.writeFileSync(directory, builder.join("\n")); 
        
        console.log("> Generated entity for client to " + directory);

    });
 
}