import { Service } from "typedi";
import { getRepository, Repository, createQueryBuilder } from "typeorm";
import { RoleModel } from "../entities/RoleModel";
import { RoleCapabilitiesModel } from "../entities/RoleCapabilityModel";
import { RolePermissionsModel } from "../entities/RolePermissionsModel";
import { SpawnSyncOptionsWithBufferEncoding } from "child_process";

export class CapabilitySrv {
    capabilitiesRepository: Repository<RoleCapabilitiesModel>;
    constructor() {
        this.capabilitiesRepository = getRepository(RoleCapabilitiesModel);       
    }

    get(idCapability: number) {
        this.capabilitiesRepository.findOne({id: idCapability});
    }

    list(appName?: string) {
        let builder = this.capabilitiesRepository.createQueryBuilder("c");
        if (appName) {
            builder = builder.where("c.appName = :appName", {appName: appName});
        }
        return builder.orderBy("appName").addOrderBy("name").getMany();
    }

    save(entity: RoleCapabilitiesModel) {
        this.capabilitiesRepository.save(entity);
    }

    delete(entity: RoleCapabilitiesModel) {
        this.capabilitiesRepository.save(entity);
    }

    deleteById(idCapability: number) {
        this.capabilitiesRepository.delete(idCapability);
    }
}


@Service()
export class RolesSrv {
    capabilitySrv: CapabilitySrv;
    permissionRepository: Repository<RolePermissionsModel>;
    rolesRepository: Repository<RoleModel>;

    constructor() {
        this.rolesRepository = getRepository(RoleModel);
        this.permissionRepository = getRepository(RolePermissionsModel);
        this.capabilitySrv = new CapabilitySrv();
    }

    getRole(leftJoin?: boolean, id?: number, name?: string) {
        let builder = this.rolesRepository.createQueryBuilder("role").where("1=1");
        if (leftJoin) {
            builder = builder.leftJoinAndSelect("role._permissions", "perm")
                .leftJoinAndSelect("perm._capabilties", "cap");
        }
        if (id) {
            builder = builder.andWhere("role.id = :id", {id: id});
        } else if (name) {
            builder = builder.andWhere("role.name = :name", {name: name});
        } else {
            return null;
        }
        return builder.orderBy("role.name").getOne();
    }

    listRoles(leftJoin?: boolean, idUserCreator?: number) {
        let builder = this.rolesRepository.createQueryBuilder("role");
        if (leftJoin) {
            builder = builder.leftJoinAndSelect("role._permissions", "perm")
                .leftJoinAndSelect("perm._capabilities", "cap");
        }
        if (idUserCreator) {
            builder = builder.where("role.idUserCreator = :idUserCreator", {idUserCreator: idUserCreator});
        }

        return builder.orderBy("role.name").getMany();    
    }

    saveRole(entity: RoleModel) {
        return this.rolesRepository.save(entity);
    }

    // todo: remove all descendants as well
    deleteRole(entity: RoleModel) {
        return this.rolesRepository.remove(entity);
    }

    async deleteByRoleName(roleName: string) {
        const entity = await this.rolesRepository.findOne({name: roleName});
        if (entity) {
            return this.rolesRepository.remove(entity);
        }
        return false;
    }

    deleteRoleById(id: number) {
        this.rolesRepository.delete(id);
    }

}