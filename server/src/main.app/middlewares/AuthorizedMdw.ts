import * as express from 'express';
import { Container } from 'typedi/Container';

import { UserModel, UserRoles } from '../entities/UserModel';
import { I18n } from '../services/I18n';
import { langInspector } from '../utils/LangInspector';

export function AuthorizedMdw(roles: number[]) {

    const i18n: I18n = Container.get(I18n);
    
    const AuthorizationMdw = function AuthorizationMdw(request: express.Request, response: express.Response, next?: (err?: any) => any): any {

        const user: UserModel = request.session.user;
        if (user) {
            const role = user.idRole;
            if (roles.indexOf(role) < 0 && !response.headersSent) {
                let lang = response.locals.lang;
                if (!lang) {
                    lang = langInspector(request, response);
                }
                var translations = i18n.generate("/errors", lang);
                if (request.headers.accept.indexOf('application/json') >= 0) {
                    return response.status(403).send({msg: "Unathorized route"});
                } else {
                    return response.status(403).render("errors/403", {translations: translations, lang: lang});
                }
            }
        }
        next();
    }
    AuthorizationMdw["roles"] = roles;
    return AuthorizationMdw;
}

export const RootOnly = AuthorizedMdw([UserRoles.admin]);
export const AdminsOnly = AuthorizedMdw([UserRoles.admin, UserRoles.teacher_admin]);
export const ParentsOnly = AuthorizedMdw([UserRoles.parents]);
export const TeachersOnly = AuthorizedMdw([UserRoles.teacher, UserRoles.teacher_admin, UserRoles.teacher_nonediting]);
export const AdminsAndTeachersOnly = AuthorizedMdw([UserRoles.admin, UserRoles.teacher, UserRoles.teacher_admin, UserRoles.teacher_nonediting]);
export const StudentsOnly = AuthorizedMdw([UserRoles.student]);