import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import {plainToClass} from "class-transformer";
import {sanitize} from "class-sanitizer";

@Injectable()
export class SanitizePipe implements PipeTransform {
  transform(value: any, { metatype}: ArgumentMetadata) {
    if (!metatype || !this.toSanitize(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    sanitize(object);
    return object;
  }

  private toSanitize(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
