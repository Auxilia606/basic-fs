import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

export const createDirectory = async (req: Request, res: Response) => {
  const dirPath = path.join(__dirname, 'uploads', req.body.dirName);

  fs.mkdir(dirPath, (err) => {
    if (err) {
      return res.status(500).json({ data: '디렉토리 생성을 실패했습니다.' });
    }
    res.json({ data: '디렉토리를 생성했습니다.' });
  });
};

export const deleteDirectory = async (req: Request, res: Response) => {
  const dirPath = path.join(__dirname, 'uploads', req.body.dirName);

  fs.rm(dirPath, { recursive: true, force: true }, (err) => {
    if (err) {
      return res.status(500).json({ data: '디렉토리 삭제를 실패했습니다.' });
    }
    res.json({ data: '디렉토리를 삭제했습니다.' });
  });
};
