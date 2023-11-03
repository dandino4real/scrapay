import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BooksService } from './books.service';
import { Book } from './book.entity';
import { CreateBookInput } from './dtos/create-Book.input';


@Resolver(of => Book)
export class BooksResolver {
    constructor(private bookService: BooksService){}


    @Query(returns => [Book])
    books(): Promise<Book[]>{
        return this.bookService.findAll()
    }

    @Mutation(returns => Book)
    createBook(@Args('bookInput') bookInput: CreateBookInput): Promise<Book>{
        return this.bookService.createBook(bookInput)
    }
}
