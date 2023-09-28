import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";


interface ClassConstructor {
  new(...args: any[]): object;
}

export function serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptors(dto));
}


export class SerializeInterceptors implements NestInterceptor {
  constructor(private dto: ClassConstructor) { }
  
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: any) => {
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true,
        });
      })
    )
  }
}