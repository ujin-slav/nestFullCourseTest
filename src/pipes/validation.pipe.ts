import {
    ArgumentMetadata,
    BadRequestException,
    Injectable,
    PipeTransform,
    Type,
  } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

import {HttpException, HttpStatus} from "@nestjs/common";

class ValidationException extends HttpException {
    messages;

    constructor(response) {
        super(response, HttpStatus.BAD_REQUEST);
        this.messages = response
    }
}

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metatype)) {
    return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
        throw new ValidationException(errors);
    }
    return value;
}

private toValidate(metatype: Type<any>): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find(type => metatype === type);
}
}