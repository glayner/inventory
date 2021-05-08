import multer, { StorageEngine } from 'multer';
import path from 'path';
import crypto from 'crypto';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

interface IUploadconfig {
  driver: 's3' | 'disk';

  tmpFolder: string;

  uploadsFolder: string;

  multer: {
    storage: StorageEngine;
    limits: {
      fileSize: number;
    };
  };

  config: {
    aws: {
      bucket: string;
    };
  };
}

export default {
  driver: process.env.STORAGE_DRIVER || 'disk',

  tmpFolder,

  uploadsFolder: path.resolve(tmpFolder, 'uploads'),

  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(request, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex');

        let finalFileName = file.originalname;
        if (request.userAuth) {
          const originalNameArr = file.originalname.split('.');
          const extension = originalNameArr[originalNameArr.length - 1];
          finalFileName = `${request.userAuth.document}-${request.userAuth.capitalizer}.${extension}`;
        }

        const filename = `${fileHash}-${Date.now()}-${finalFileName}`;

        return callback(null, filename);
      },
    }),
    limits: {
      fileSize: 1 * 1024 * 1024,
    },
  },

  config: {
    aws: {
      bucket: process.env.AWS_STORAGE_BUCKET || 'nolu-v3',
    },
  },
} as IUploadconfig;
