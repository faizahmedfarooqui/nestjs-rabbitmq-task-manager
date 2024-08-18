/**
 * Service to log messages or another place in future enhancements
 */

import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService {
	log(message: string) {
		console.log(message);
	}
}
