declare namespace Express {
  export interface Request {
    user_id: string;
    file?: Express.MulterS3.File;
  }
}
