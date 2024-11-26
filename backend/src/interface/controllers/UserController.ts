import { Request, Response } from 'express';
import { BaseController } from './BaseController';
import { CreateUserUseCase } from '../../useCases/user/CreateUser';
import { GetUserUseCase } from '../../useCases/user/GetUser';

export class UserController extends BaseController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private getUserUseCase: GetUserUseCase,
  ) {
    super();
  }

  protected async executeImpl(req: Request, res: Response): Promise<void> {
    try {
      switch (req.method) {
        case 'POST':
          const { name, age } = req.body;
          if (!name || !age) {
            this.clientError(res, 'Name and age are required');
            return;
          }
          const user = await this.createUserUseCase.execute(name, age);
          this.created(res, user);
          break;

        case 'GET':
          if (req.params.id) {
            const user = await this.getUserUseCase.execute(req.params.id);
            if (!user) {
              this.notFound(res, 'User not found');
              return;
            }
            this.ok(res, user);
          }
          break;

        default:
          this.clientError(res, 'Method not supported');
      }
    } catch (err) {
      throw err;
    }
  }
}
