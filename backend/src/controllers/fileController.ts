import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });

export const getFileList = async (req: Request, res: Response) => {
  const { path: dirPath = 'uploads/' } = req.query;

  if (typeof dirPath !== 'string') {
    return res.status(400).json({ data: 'path 값은 String이어야 합니다.' });
  }

  fs.readdir(dirPath, (err, files) => {
    if (err) {
      return res
        .status(500)
        .json({ data: '경로를 읽어오는 중 에러가 발생했습니다.' });
    }

    res.json({ data: files });
  });
};

export const uploadFile = upload.single('file');

export const uploadFileResponse = async (req: Request, res: Response) => {
  res.json({ data: '파일 업로드에 성공했습니다.' });
};

export const downloadFile = async (req: Request, res: Response) => {
  const filePath = path.join(__dirname, 'uploads', req.params.filename);

  res.download(filePath);
};

export const deleteFile = async (req: Request, res: Response) => {
  const filePath = path.join(__dirname, 'uploads', req.params.filename);

  fs.unlink(filePath, (err) => {
    if (err) {
      return res.status(500).json({ data: '파일 삭제를 실패했습니다.' });
    }
    res.json({ data: '파일 삭제를 성공했습니다.' });
  });
};
