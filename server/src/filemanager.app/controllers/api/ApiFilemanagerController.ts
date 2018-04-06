
import * as express from 'express';
import { Controller, Get, Render, Req, Res, Session, UseBefore, QueryParam, Head, Delete, Put, Post, UploadedFile, BadRequestError, BodyParam, Body } from 'routing-controllers';
import { Inject } from 'typedi';
import { AuthenticatedMdw } from '../../../main.app/middlewares/AuthenticatedMdw';
import { TranslationMdw } from '../../../main.app/middlewares/TranslationMdw';
import { UserSrv } from '../../../main.app/services/UserSrv';
import { SessionSrv } from '../../../main.app/services/SessionSrv';
import { SessionModel } from '../../../main.app/model/SessionModel';
import { FilemanagerSrv, ListFilesOptions, ACLTable } from '../../services/FilemanagerSrv';
import { Response } from 'express';
import { fileUploadOptions } from '../../../main.app/utils/fileUploadOptions';

const excludedMimeTypes = [];
const zipMimeTypes = [".gz", ".zip", ".tgz", ".tar.gz"];

@Controller("/api/filemgr")
@UseBefore(AuthenticatedMdw) 
@UseBefore(TranslationMdw)
export class ApiFilemanagerController {
    
    @Inject()
    userSrv: UserSrv;
 
    @Inject()
    sessionSrv: SessionSrv;

    @Inject()
    filemanagerSrv: FilemanagerSrv;

    @Get("/list")    
    listPath(@QueryParam("path", {required: true}) path: string, 
            @QueryParam("recursive") recursive: boolean,
            @QueryParam("dotfiles") dotfiles: boolean,
            @QueryParam("exts") exts: string,
            @QueryParam("hidefiles") hidefiles: boolean, 
            @Session() session: SessionModel) {      
        const idRole = session.user.idRole + "";
        const username = session.user.username;
        const opts: ListFilesOptions = {
            dotfiles: dotfiles,
            exts: (exts || "").split(",").map( e => e.trim() ),
            recursive: recursive,
            hidefiles: hidefiles
        };
        return this.filemanagerSrv.listPath(path, idRole, username, opts);
    }

    @Get("/")    
    async readFile(@QueryParam("path", {required: true}) path: string, @Session() session: SessionModel) {      
        const idRole = session.user.idRole;
        const username = session.user.username;
        try {
            const txt = await this.filemanagerSrv.readFile(path, idRole+ "", username)
            return txt || "File not found";
        } catch(Ex) {

        }
    }

    @Get("/download")    
    download(@QueryParam("path", {required: true}) path: string, @QueryParam("inline") inline: boolean,  @Res() res: Response,
        @Session() session: SessionModel) {      
        const idRole = session.user.idRole;
        const username = session.user.username;
        return this.filemanagerSrv.downloadFile(path, res, idRole+ "", username, inline);
    }

    @Get("/acl")    
    getACL(@QueryParam("path", {required: true}) path: string, @Session() session: SessionModel) {      
        const idRole = session.user.idRole;
        const username = session.user.username;
        return this.filemanagerSrv.getACL(path, idRole+"", username);
    }

    @Post("/acl")    
    setACL(@QueryParam("path", {required: true}) path: string, @Body() acl: ACLTable,  @Session() session: SessionModel) {      
        const idRole = session.user.idRole;
        const username = session.user.username;
        return this.filemanagerSrv.setACL(path, acl, idRole+"", username);
    }

    @Delete("/")    
    deletePath(@QueryParam("path", {required: true}) path: string, @Session() session: SessionModel) {      
        const idRole = session.user.idRole;
        const username = session.user.username;
        return this.filemanagerSrv.deletePaths([path], idRole+"", username);
    }

    @Post("/")    
    deletePaths(@Body() paths: string[], @Session() session: SessionModel) {      
        const idRole = session.user.idRole;
        const username = session.user.username;
        return this.filemanagerSrv.deletePaths(paths, idRole+"", username);
    }

    @Post("/move")    
    movePath(@BodyParam("path", {required: true}) path: string, 
             @BodyParam("path2", {required: true}) path2: string, @Session() session: SessionModel) {      
        const idRole = session.user.idRole;
        const username = session.user.username;
        return this.filemanagerSrv.movePath(path, path2, idRole+"", username);
    }

    @Post("/dir")    
    createDir(@BodyParam("path", {required: true}) path: string, 
              @BodyParam("dirname", {required: true}) dirname: string, @Session() session: SessionModel) {      
        const idRole = session.user.idRole;
        const username = session.user.username;
        return this.filemanagerSrv.createDir(path, dirname, idRole+"", username);
    }

    @Post("/ascii")    
    saveAsciiFile(@BodyParam("path", {required: true}) path: string, 
                 @BodyParam("filename", {required: true}) filename: string,
                 @BodyParam("text", {required: true}) text: string,
                 @Session() session: SessionModel) {      
        const idRole = session.user.idRole;
        const username = session.user.username;
        return this.filemanagerSrv.saveAsciiFile(path, filename, text, idRole+"", username);
    }

    @Post("/upload")
    handleFileUpload(@UploadedFile("files", {options: fileUploadOptions}) files: Express.Multer.File[],
                     @Session() session: SessionModel) {

        console.log(files);
        
        return files;
        /*
        if (excludedMimeTypes.indexOf(file.mimetype) >= 0) {
            throw new BadRequestError(`${file.mimetype} is not a supported file type!`);
        }
        const idRole = session.user.idRole;
        const username = session.user.username;
        return this.filemanagerSrv.uploadFile(files, idRole+"", username);
        */
    }

    @Post("/zip")
    zipPath(@BodyParam("path") path: string,
            @Session() session: SessionModel) {       
        const idRole = session.user.idRole;
        const username = session.user.username;
        return this.filemanagerSrv.zipPath(path, idRole+"", username);
    }

    @Post("/unzip")
    unzipPath(@BodyParam("path") path: string,
            @Session() session: SessionModel) {
        if (zipMimeTypes.indexOf(path) < 0) {
            throw new BadRequestError(`${path} is not a supported zip file type!`);
        }
        const idRole = session.user.idRole;
        const username = session.user.username;
        return this.filemanagerSrv.unzipPath(path, idRole+"", username);
    }
}

 