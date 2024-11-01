import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getApiDocLink(): string {
    return 'API documentation is available at /api';
  }
}
