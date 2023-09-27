import { Injectable } from '@nestjs/common';
import { PowerService } from 'src/power/power.service';

@Injectable()
export class DiskService {
  constructor(private powerService: PowerService) {}
  getData() {
    console.log('Hello from disk service');
    this.powerService.supplyPower(40, 'Disk');
    return 'Hello from disk service';
  }
}
