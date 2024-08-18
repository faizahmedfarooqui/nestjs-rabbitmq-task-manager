/**
 * This file is used to define the AppService class.
 *
 * The AppService class is responsible for handling
 * the business logic of the application.
 */

import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
