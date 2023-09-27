import { Injectable } from '@nestjs/common';

@Injectable()
export class PowerService {
  supplyPower(watt: number, module: string) {
    console.log(`Supplying ${watt} watts to ${module}`);
  }
}
