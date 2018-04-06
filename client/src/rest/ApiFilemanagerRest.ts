import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiFilemanagerRest { 
   constructor(private http: HttpClient) {
   }
   /**
    * @api {get} @/api/filemgr/list
    * @apiName listPath
    * @apiGroup ApiFilemanagerController
   */
   listPath(path: string, recursive?: boolean, dotfiles?: boolean, exts?: string, hidefiles?: boolean) {
         const queryParamsObj: any = {};
          if (path!=null) {
               queryParamsObj.path = path + "";
          }
          if (recursive!=null) {
               queryParamsObj.recursive = recursive + "";
          }
          if (dotfiles!=null) {
               queryParamsObj.dotfiles = dotfiles + "";
          }
          if (exts!=null) {
               queryParamsObj.exts = exts + "";
          }
          if (hidefiles!=null) {
               queryParamsObj.hidefiles = hidefiles + "";
          }
         const queryParams = new HttpParams({
         fromObject: queryParamsObj
         });
         const url = `@/api/filemgr/list`
         return this.http.get(url, {params: queryParams});
   }
   /**
    * @api {get} @/api/filemgr/
    * @apiName readFile
    * @apiGroup ApiFilemanagerController
   */
   readFile(path: string) {
         const queryParamsObj: any = {};
          if (path!=null) {
               queryParamsObj.path = path + "";
          }
         const queryParams = new HttpParams({
         fromObject: queryParamsObj
         });
         const url = `@/api/filemgr/`
         return this.http.get(url, {params: queryParams});
   }
   /**
    * @api {get} @/api/filemgr/download
    * @apiName download
    * @apiGroup ApiFilemanagerController
   */
   download(path: string, inline?: boolean) {
         const queryParamsObj: any = {};
          if (path!=null) {
               queryParamsObj.path = path + "";
          }
          if (inline!=null) {
               queryParamsObj.inline = inline + "";
          }
         const queryParams = new HttpParams({
         fromObject: queryParamsObj
         });
         const url = `@/api/filemgr/download`
         return this.http.get(url, {params: queryParams});
   }
   /**
    * @api {get} @/api/filemgr/acl
    * @apiName getACL
    * @apiGroup ApiFilemanagerController
   */
   getACL(path: string) {
         const queryParamsObj: any = {};
          if (path!=null) {
               queryParamsObj.path = path + "";
          }
         const queryParams = new HttpParams({
         fromObject: queryParamsObj
         });
         const url = `@/api/filemgr/acl`
         return this.http.get(url, {params: queryParams});
   }
   /**
    * @api {post} @/api/filemgr/acl
    * @apiName setACL
    * @apiGroup ApiFilemanagerController
   */
   setACL(path: string, entity?: any) {
         const queryParamsObj: any = {};
          if (path!=null) {
               queryParamsObj.path = path + "";
          }
         const queryParams = new HttpParams({
         fromObject: queryParamsObj
         });
         const url = `@/api/filemgr/acl`
         return this.http.post(url, entity, {params: queryParams});
   }
   /**
    * @api {delete} @/api/filemgr/
    * @apiName deletePath
    * @apiGroup ApiFilemanagerController
   */
   deletePath(path: string) {
         const queryParamsObj: any = {};
          if (path!=null) {
               queryParamsObj.path = path + "";
          }
         const queryParams = new HttpParams({
         fromObject: queryParamsObj
         });
         const url = `@/api/filemgr/`
         return this.http.delete(url, {params: queryParams});
   }
   /**
    * @api {post} @/api/filemgr/
    * @apiName deletePaths
    * @apiGroup ApiFilemanagerController
   */
   deletePaths(entity?: any) {
         const url = `@/api/filemgr/`
         return this.http.post(url, entity);
   }
   /**
    * @api {post} @/api/filemgr/move
    * @apiName movePath
    * @apiGroup ApiFilemanagerController
   */
   movePath(path: string, path2: string) {
         const url = `@/api/filemgr/move`
         return this.http.post(url, {});
   }
   /**
    * @api {post} @/api/filemgr/dir
    * @apiName createDir
    * @apiGroup ApiFilemanagerController
   */
   createDir(path: string, dirname: string) {
         const url = `@/api/filemgr/dir`
         return this.http.post(url, {});
   }
   /**
    * @api {post} @/api/filemgr/ascii
    * @apiName saveAsciiFile
    * @apiGroup ApiFilemanagerController
   */
   saveAsciiFile(path: string, filename: string, text: string) {
         const url = `@/api/filemgr/ascii`
         return this.http.post(url, {});
   }
   /**
    * @api {post} @/api/filemgr/upload
    * @apiName handleFileUpload
    * @apiGroup ApiFilemanagerController
   */
   handleFileUpload(files?: Array<any>) {
         const url = `@/api/filemgr/upload`
         return this.http.post(url, {});
   }
   /**
    * @api {post} @/api/filemgr/zip
    * @apiName zipPath
    * @apiGroup ApiFilemanagerController
   */
   zipPath(path?: string) {
         const url = `@/api/filemgr/zip`
         return this.http.post(url, {});
   }
   /**
    * @api {post} @/api/filemgr/unzip
    * @apiName unzipPath
    * @apiGroup ApiFilemanagerController
   */
   unzipPath(path?: string) {
         const url = `@/api/filemgr/unzip`
         return this.http.post(url, {});
   }
}
