import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthRequest } from '@/api/user/auth/models/auth.dto';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<AuthRequest>();
    return request.user;
  },
);
