import { Request, Response } from 'express';

export abstract class BaseController {
  protected abstract executeImpl(req: Request, res: Response): Promise<void>;

  public async execute(req: Request, res: Response): Promise<void> {
    try {
      await this.executeImpl(req, res);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  protected ok<T>(res: Response, dto?: T) {
    if (dto) {
      return res.status(200).json(dto);
    }
    return res.sendStatus(200);
  }

  protected created<T>(res: Response, dto?: T) {
    if (dto) {
      return res.status(201).json(dto);
    }
    return res.sendStatus(201);
  }

  protected clientError(res: Response, message?: string) {
    return res.status(400).json({ message: message || 'Bad request' });
  }

  protected notFound(res: Response, message?: string) {
    return res.status(404).json({ message: message || 'Not found' });
  }
}
