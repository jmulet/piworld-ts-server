import { diskStorage } from 'multer';
import { config } from '../../server.config';
import { Request } from 'express';
import * as path from 'path';

const rootFilesystem = config.rootFilesystem;

export const fileUploadOptions = {
    storage: diskStorage({
        destination: (req: Request, file: any, cb: any) => {
            console.log("extract destination from request, ", rootFilesystem); 
            console.log(req.query);
            cb(null, path.join(rootFilesystem, req.query.path || ""));
        },
        filename: (req: any, file: any, cb: any) => {
            console.log("filenmae is ", file);
            cb(null, file.originalname);
        }
    }),
    fileFilter: (req: any, file: any, cb: any) => {
        cb(null, true);
    },
    limits: {
        fieldNameSize: 255,
        fileSize: 1024 * 1024 * 20
    }
}
