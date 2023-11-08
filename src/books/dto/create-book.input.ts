import { Field, InputType, Int } from "@nestjs/graphql";
import { IsAlpha, IsNotEmpty } from "class-validator";

@InputType()
export class CreateBookInput {

    
    @IsNotEmpty()
    @Field()
    name: string;

    @IsNotEmpty()
    @Field()
    description: string
}