/**
 * The AppService class is a provider that contains the business
 * logic of the application.
 *
 * It is used by the AppController to handle incoming requests.
 */

import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
