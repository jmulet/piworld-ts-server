
export interface pwCoreI {
    Config: {
        author: string;
        basePrefix: string;
        staticPrefix: string;
        defaultLang: string;
        socketPath: string;
    }
    User: {
        id: number;
        fullname: string;
        username:string;
        idRole: number;
        idSchool: number;
        uopts: any;
    },
    Version: string;
    Lang: string;
    Translations: any;
    UserRoles: any;
    UserRolesList: Function;
    SupportedLangs: string[];
    __: Function;
}

// create a copy for security reasons
export const pwCore: pwCoreI = {... window["pwCore"]};