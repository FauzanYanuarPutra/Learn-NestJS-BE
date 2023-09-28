import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { UsersService } from "src/users/users.service";

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(public usersService: UsersService) { }

  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const {userId} = request.session || {};

    if (userId) {
      const data = await this.usersService.findOneBy(userId);
      request.session.currentUser = data;
    }
    
    return next.handle();
  }
}

