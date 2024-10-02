import { Request, Response } from 'express';

export const testCreateChatWithBot = async (req: Request, res: Response) => {
  return res.json('success');
};
