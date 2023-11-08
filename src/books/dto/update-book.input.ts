import { InputType, Field} from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateBookInput {
    
    @IsNotEmpty()
    @Field()
    name: string;

    @IsNotEmpty()
    @Field()
    description: string

}