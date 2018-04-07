import { Body, Controller, Delete, Get, Param, Post, QueryParam } from 'routing-controllers';
import { Inject } from 'typedi';

import { RoleCapabilitiesModel } from '../../entities/RoleCapabilityModel';
import { RoleModel } from '../../entities/RoleModel';
import { RolesSrv } from '../../services/RolesSrv';

/*
 * slim=true does not include left joins to the roles object
 */
@Controller("/api/roles")
export class ApiRolesController {
 
    @Inject()
    rolesSrv: RolesSrv;
 
    @Get("/r/list")
    listRoles(@QueryParam("slim") slim: boolean, @QueryParam("idUserCreator") idUserCreator: number) {        
        return this.rolesSrv.listRoles(!slim, idUserCreator);
    }

    @Get("/r/")
    getRole(@QueryParam("slim") slim: boolean, @QueryParam("id") id: number, @QueryParam("string") name: string) {        
        return this.rolesSrv.getRole(!slim, id, name)
    }

    @Post("/r/")
    saveRole(@Body({validate: true, required: true}) entity: RoleModel) {        
        return this.rolesSrv.saveRole(entity);
    }
  
    @Delete("/r/")
    deleteRole(@QueryParam("id") id: number, @QueryParam("string") name: string) {    
        if (id) {
            return this.rolesSrv.deleteRoleById(id);
        } else if (name) {
            return this.rolesSrv.deleteByRoleName(name);
        } else {
            return false;
        }        
    }

    @Get("/c/list")
    listCapabilities(@QueryParam("appName") appName: string) {        
        return this.rolesSrv.capabilitySrv.list(appName);
    }

    @Get("/c/:id")
    getCapability(@Param("id") id: number) {        
        return this.rolesSrv.capabilitySrv.get(id);
    }

    @Post("/c/")
    saveCapability(@Body({validate: true, required: true}) entity: RoleCapabilitiesModel) {        
        return this.rolesSrv.capabilitySrv.save(entity);
    }
  
    @Delete("/c/:id")
    deleteCapability(@Param("id") id: number) {    
         return this.rolesSrv.capabilitySrv.deleteById(id);        
    }

}
