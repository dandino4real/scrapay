import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';
import { CreateBookInput } from './dto/create-book.input';


@Resolver(of => Book)
export class BooksResolver {
    constructor(private bookService: BooksService){}


    @Query(returns => [Book])
    books(): Promise<Book[]>{
        return this.bookService.findAll()
    }

    @Query(returns => Book)
    getBook(@Args('id', {type: () => Int}) id: number) : Promise<Book>{
        return this.bookService.findOne(id)

    }

    @Mutation(returns => Book)
    createBook(@Args('bookInput') bookInput: CreateBookInput): Promise<Book>{
        return this.bookService.create(bookInput)
    }





}
