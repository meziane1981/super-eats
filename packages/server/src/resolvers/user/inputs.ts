import { IsEmail, Length, MaxLength } from "class-validator";
import { Field, InputType } from "type-graphql";
import { User } from '../../entity/User';

@InputType()
class CreateUserInput implements Partial<User> {

    @Field()
    @MaxLength(254)
    @IsEmail()
    email: string;

    @Field()
    @Length(5, 64)
    password: string;

    @Field({ nullable: true })
    firstName?: string;

    @Field({ nullable: true })
    lastName?: string;

}

@InputType()
class LoginInput implements Partial<User> {

    @Field()
    email: string;

    @Field()
    password: string;

}

export { CreateUserInput, LoginInput }