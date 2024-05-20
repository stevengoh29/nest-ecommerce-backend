import { Injectable, Logger } from '@nestjs/common';
import { DatabaseException } from './exceptions/common';

@Injectable()
export class AppService {

  private readonly log = new Logger(AppService.name);

  getHello(): string {
    throw new DatabaseException();
  }
}
