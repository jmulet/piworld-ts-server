import 'es6-shim';
import 'reflect-metadata';

import { Container } from 'typedi';

import { FilemanagerSrv } from '../../src/filemanager.app/services/FilemanagerSrv';
import { config } from '../../src/server.config';
import * as path from 'path'

const filemanagerSrv: FilemanagerSrv = Container.get(FilemanagerSrv);

const rootFilesystem = config.rootFilesystem;
console.log("Root ", rootFilesystem);

(async function(){
   // console.log(await filemanagerSrv.createDir("./", "prova", "student", 1));
    console.log(await filemanagerSrv.saveAsciiFile("Users/root/prova", ".confug.txt", "En un pais multicolor nacio una abeja bajo el sol", "student", "root"));
    console.log(JSON.stringify(await filemanagerSrv.listPath("./Users", "student", "root", {dotfiles: false, recursive: true, includeAcls: true}), null, 2));
    console.log();
})();
