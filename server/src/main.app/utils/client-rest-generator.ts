import { getMetadataArgsStorage } from "routing-controllers";
import * as fs from "fs";
import * as path from "path";
import { clientModelsGenerator } from "./client-models-generator";

function getParamTypes(target: any, key: string) {
    const types = Reflect.getMetadata("design:paramtypes", target, key);
    let s;
    if (types)  {
        s = types.map(a => a.name);
    }
    return s || [];
}

export function clientRestGenerator() {


    // Generate client entities, services and documentation from annotated classes.
    const knownModelTypes = clientModelsGenerator();

    const metadataArgsStorage = getMetadataArgsStorage();
    const controllers = metadataArgsStorage.controllers;

    const codeAll = [];
    codeAll.push("import { HttpClient, HttpParams } from '@angular/common/http';");
    codeAll.push("import { Injectable } from '@angular/core';");
    codeAll.push("");

    // Insert here the entity imports
    const codeAllEntityImportsIndex = codeAll.length - 1;
    const codeAllEntityImports = [];

    codeAll.push("");
    codeAll.push("@Injectable()");
    codeAll.push("export class RestApi {");

    // For the monolithic rest; create the access to the different classes
    controllers.forEach((controller) => {
        const restName = controller.target.name.replace("Controller", "Rest");
        const namespace = controller.target.name.replace("Controller", "");
        codeAll.push(namespace + ": " + restName + ";");
    });

    codeAll.push("constructor(private http: HttpClient) {");
    controllers.forEach((controller) => {
        const restName = controller.target.name.replace("Controller", "Rest");
        const namespace = controller.target.name.replace("Controller", "");
        codeAll.push("  this." + namespace + " = new " + restName + "(http);");
    });
    codeAll.push("}");
    codeAll.push("}");

    controllers.forEach((controller) => {
        const restName = controller.target.name.replace("Controller", "Rest");
        const namespace = controller.target.name.replace("Controller", "");

        const code = ["import { HttpClient, HttpParams } from '@angular/common/http';"];
        code.push("import { Injectable } from '@angular/core';");
        code.push("");

        // Insert here the entity imports
        const codeEntityImportsIndex = code.length - 1;
        const codeEntityImports = [];

        const codeClazz = [];
        codeClazz.push("");
        codeClazz.push("/* inject-export */ class " + restName + " {");
        codeClazz.push("constructor(private http: HttpClient) {}");

        console.log("\n=======================================================");
        console.log("* RestController: ", restName);
        const baseUrl = controller.route || "/";
        const actions = metadataArgsStorage.actions.filter((action) => action.target === controller.target);
        //For each action search its parameters

        actions.forEach((action) => {
            const middlewares = metadataArgsStorage.uses.filter((use) => {
                return use.target.name === controller.target.name && use.method === action.method;
            }).map((mid) => {
                return { name: mid.middleware.name || mid.middleware.constructor.name, roles: mid.middleware["roles"] };
            });

            // check if this route is encrypted, and therefore set hash to #
            let hash = "@";
            const apiPermissions = middlewares.filter((mid) => mid.name === "AuthorizationMdw");
            if (middlewares.filter((mid) => mid.name === "DecryptBodyMdw").length > 0) {
                hash = "#";
            }

            console.log("\n\t " + action.type.toUpperCase() + " " + hash + baseUrl + action.route);
            console.log("\t Middlewares: " + " ", middlewares);
            console.log("\t " + action.method + "(...)");
            let params = metadataArgsStorage.params.filter((param) => {
                return param.method === action.method && param.object.constructor.name === controller.target.name;
            });
            params = params.filter((param) => param.type !== 'session' && param.type !== 'response' && param.type !== 'request');
            // sort params by index
            params = params.sort((x, y) => x.index - y.index);

            action["params"] = params;
            const parameters = [];
            const queryParameters = [];
            const pathParameters = [];
            let bodyPart = "";
            let queryPart = "";
            // Assume action route to be string. TODO: Support for regExp routes
            let actionRoute = action.route + "";

            params.forEach((param) => {
                const types = getParamTypes(param.object, param.method);
                let tsType: string = types[param.index];
                if (["Number", "String", "Boolean"].indexOf(tsType) >= 0) {
                    tsType = tsType.toLowerCase();
                }
                if (tsType === "Array") {
                    tsType = "Array<any>";
                }
                tsType = tsType || "any"
                param["tsType"] = tsType;

                if (param.type === "body") {
                    if (knownModelTypes.indexOf(tsType) >= 0) {
                        if (codeEntityImports.indexOf(tsType) < 0) {
                            codeEntityImports.push(tsType);
                        }
                        if (codeAllEntityImports.indexOf(tsType) < 0) {
                            codeAllEntityImports.push(tsType);
                        }
                    } else if ( ["number", "string", "boolean", "Date"].indexOf(tsType) < 0) {
                        tsType = "any";
                        param["tsType"] = tsType;
                    }
                    param.name = "entity";
                    bodyPart = ", " + param.name;
                } else if (param.type === "query") {
                    queryParameters.push(param);
                } else if (param.type === "param" || param.type === "params") {
                    // Replace possible path params in actionRoute
                    pathParameters.push(param);
                    actionRoute = actionRoute.replace(":" + param.name, "${pathParams." + param.name + "}");
                }

                console.log("\t\t " + param.index + ". " + param.type + " " + param.name + ": " + param["tsType"]);
                const optional = param.required? "" : "?";                
                parameters.push(param.name + optional + ": " + param["tsType"]);
            });
            
            const codeAction = [];

            // Add documentation to the action 
            codeAction.push("/**");
            const uri = (hash + baseUrl + action.route).replace("//", "/");
            codeAction.push(" * @api {" + action.type.toLowerCase() + "} " + uri);
            codeAction.push(" * @apiName " + action.method);
            codeAction.push(" * @apiGroup " + controller.target.name);
            if (apiPermissions.length > 0) {
                codeAction.push(" * @apiPermission Accepted roles " + (apiPermissions[0].roles || []).join(", "));
            }
            codeAction.push("*/");
            codeAction.push(action.method + "(" + parameters.join(", ") + ") {");
            if (queryParameters.length) {
                queryPart = ", {params: queryParams}";
                codeAction.push("const queryParams = new HttpParams({");
                codeAction.push("   fromObject: {");
                queryParameters.forEach((qp) => {
                    codeAction.push("      " + qp.name + ": " + qp.name + " + \"\",");
                });
                codeAction.push("  }");
                codeAction.push("});");
            }
            if (pathParameters.length) {
                codeAction.push("const pathParams = {");
                pathParameters.forEach((qp) => {
                    codeAction.push("      " + qp.name + ": " + qp.name + ",");
                });
                codeAction.push("};");
            }

            if ((action.type === "put" || action.type === "post") && !bodyPart) {
                bodyPart = ", {}";
            }

            const url = (hash + baseUrl + actionRoute).replace("//", "/");
            codeAction.push("   return this.http." + action.type + "(\"" + url + "\"" + bodyPart + queryPart + ");");
            codeAction.push("}");

            // Here action finishes: Add to the current Controller and to the monolithic struture
            codeClazz.push(codeAction.join("\n"));
        });
        controller["actions"] = actions;
        codeClazz.push("}");
        codeClazz.push("");

        code.push(codeClazz.join("\n").replace("/* inject-export */", "@Injectable()\nexport "));
        codeAll.push(codeClazz.join("\n").replace("/* inject-export */", ""));

        // Insert entity imports
        code.splice(codeEntityImportsIndex, 0,
            codeEntityImports.map((importName) => "import { " + importName + " } from \"../entities/" + importName + "\" ").join("\n")
        );

        // write to file per controller
        const directory = path.join(global.__publicDir, "../../src/rest/" + restName + ".ts");
        fs.writeFileSync(directory, code.join("\n"));
    });

    // Insert entity imports
    codeAll.splice(codeAllEntityImportsIndex, 0,
        codeAllEntityImports.map((importName) => "import { " + importName + " } from \"../entities/" + importName + "\" ").join("\n")
    );

    // write the monolithic restApi with all controllers
    const directory = path.join(global.__publicDir, "../../src/rest/RestApi.ts");
    fs.writeFileSync(directory, codeAll.join("\n"));

 
} 