import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { buildLogContent } from '@/common/logger/logger.utils';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('API');

  use(request: Request, response: Response, next: NextFunction): void {
    request.headers['x-request-time'] = Date.now().toString();

    response.on('finish', () => {
      const { statusCode } = response;
      if (statusCode < 400) {
        const logContent = buildLogContent(request, response);
        this.logger.log(JSON.stringify(logContent.logMessage));
      }
      if (statusCode >= 400) {
        const logContent = buildLogContent(request, response);
        this.logger.error(JSON.stringify(logContent.logMessage));
      }
    });

    next();
  }
}
