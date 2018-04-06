import { getMetadataArgsStorage } from "routing-controllers";
import * as fs from "fs";
import * as path from "path";
import { clientModelsGenerator } from "./client-models-generator";
import { TsGenSource, TsGenImport, TsGenClass, TsGenDeclaration, TsGenConstructor, TsGenParam, TsGenMethod } from "tsgen2";

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

    const directoryRestApi = path.join(global.__publicDir, "../../src/rest/RestApi.ts");
    const monoGen = new TsGenSource(directoryRestApi);
    monoGen.addImport(new TsGenImport("HttpClient, HttpParams", "@angular/common/http"));
    monoGen.addImport(new TsGenImport("Injectable", "@angular/core"));
     
    const RestApiClass = new TsGenClass("RestApi", {exportable: true});
    monoGen.addClass(RestApiClass);
    RestApiClass.addDecorator("@Injectable()"); 

    // For the monolithic rest; create the access to the different classes
    controllers.forEach((controller) => {
        const restName = controller.target.name.replace("Controller", "Rest");
        const namespace = controller.target.name.replace("Controller", "");
        RestApiClass.addDeclaration(new TsGenDeclaration(namespace, restName)); 
    });

    const RestApiConstructor = new TsGenConstructor();
    RestApiConstructor.addParameter(new TsGenParam("http", "HttpClient", {optional:false, visibility: "private"}));
    RestApiClass.setConstructor(RestApiConstructor);
     
    controllers.forEach((controller) => {
        const restName = controller.target.name.replace("Controller", "Rest");
        const namespace = controller.target.name.replace("Controller", "");
        RestApiConstructor.addToBody("  this." + namespace + " = new " + restName + "(http);");
    }); 

    controllers.forEach((controller) => {
        const restName = controller.target.name.replace("Controller", "Rest");
        const namespace = controller.target.name.replace("Controller", "");

        const directoryCC = path.join(global.__publicDir, "../../src/rest/" + restName + ".ts");
        const controllerGen = new TsGenSource(directoryCC);
        controllerGen.addImport(new TsGenImport("HttpClient, HttpParams", "@angular/common/http"));
        controllerGen.addImport(new TsGenImport("Injectable", "@angular/core"));

        const ControllerConstructor = new TsGenConstructor();
        ControllerConstructor.addParameter(new TsGenParam("http", "HttpClient", {optional: false, visibility: "private"}));

        const ControllerClass = new TsGenClass(restName, {exportable: true});
        ControllerClass.addDecorator("@Injectable()");
        ControllerClass.setConstructor(ControllerConstructor);
        controllerGen.addClass(ControllerClass);
        const ControllerClassMono = new TsGenClass(restName);
        ControllerClassMono.setConstructor(ControllerConstructor);
        monoGen.addClass(ControllerClassMono);
 
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
            const queryParameters = [];
            const pathParameters = [];
            let bodyPart = "";
            let queryPart = "";
            // Assume action route to be string. TODO: Support for regExp routes
            let actionRoute = action.route + "";

              
            const codeAction = new TsGenMethod(action.method);
            ControllerClass.addMethod(codeAction);
            ControllerClassMono.addMethod(codeAction);

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
                        const tsGenImport = new TsGenImport(tsType, "../entities/"+tsType);
                        monoGen.addImport(tsGenImport);
                        controllerGen.addImport(tsGenImport);  
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
                codeAction.addParameter(new TsGenParam(param.name, param["tsType"], {optional: !param.required}));
            });
          

            // Add documentation to the action 
            codeAction.addDecorator("/**");
            const uri = (hash + baseUrl + action.route).replace("//", "/");
            codeAction.addDecorator(" * @api {" + action.type.toLowerCase() + "} " + uri);
            codeAction.addDecorator(" * @apiName " + action.method);
            codeAction.addDecorator(" * @apiGroup " + controller.target.name);
            if (apiPermissions.length > 0) {
                codeAction.addDecorator(" * @apiPermission Accepted roles " + (apiPermissions[0].roles || []).join(", "));
            }
            codeAction.addDecorator("*/"); 
            if (queryParameters.length) {
                queryPart = ", {params: queryParams}";
                codeAction.addToBody("   const queryParamsObj: any = {};");                
                queryParameters.forEach((qp) => {
                    codeAction.addToBody("    if (" + qp.name + "!=null) {");
                    codeAction.addToBody("         queryParamsObj." + qp.name + " = "+ qp.name + " + \"\";");
                    codeAction.addToBody("    }");      
                }); 
                codeAction.addToBody("   const queryParams = new HttpParams({");
                codeAction.addToBody("   fromObject: queryParamsObj")
                codeAction.addToBody("   });");
            }
            if (pathParameters.length) {
                codeAction.addToBody("   const pathParams: any = {};");                
                pathParameters.forEach((qp) => {
                    codeAction.addToBody("    if (" + qp.name + "!=null) {");
                    codeAction.addToBody("         pathParams." + qp.name + " = "+ qp.name + " + \"\";");
                    codeAction.addToBody("    }");      
                }); 
            }

            if ((action.type === "put" || action.type === "post") && !bodyPart) {
                bodyPart = ", {}";
            }

            const url = (hash + baseUrl + actionRoute).replace("//", "/");
            codeAction.addToBody("   const url = `" + url + "`" );
            codeAction.addToBody("   return this.http." + action.type + "(url" + bodyPart + queryPart + ");");
              
        });
        controller["actions"] = actions;
        
        // write to the controller to file
        controllerGen.save();
    });
 
    // write the monolithic restApi with all controllers
    monoGen.save();
} 