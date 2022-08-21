import type { IFileUploader, UploadedData } from 'ricos-types';

export class Uploader implements IFileUploader {
  uploadFunc;

  constructor(uploadFunc) {
    this.uploadFunc = uploadFunc;
  }

  upload(file: File) {
    return new Promise<UploadedData>((resolve, reject) => {
      this.uploadFunc(file, ({ data, error }: UploadedData) => {
        if (error) {
          reject(error);
        } else {
          resolve({ data });
        }
      });
    });
  }
}
