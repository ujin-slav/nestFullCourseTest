import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Field, InputType, ObjectType } from '@nestjs/graphql'

@ObjectType()
@InputType()
export class IUser {
   
    @Field()
    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @Field()
    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    password: string;
}