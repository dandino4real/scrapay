import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { SetMetadata, UseGuards } from '@nestjs/common';
import { JwtStrategy } from 'src/auth/jwt.strategy';

import { Roles } from './roles/roles.decorator'; 
import { PermissionGuard } from 'src/auth/permission.guard';
import { AuthGuard } from 'src/auth/auth.guard';

@Resolver(of => Book)
export class BooksResolver {
  constructor(private bookService: BooksService) {}

  // Query to fetch all books, restricted to "user" role
  @Query(returns => [Book])
  // @UseGuards(AuthGuard)
  // @SetMetadata('permissions', ['read:books'])
  books(): Promise<Book[]> {
    return this.bookService.findAll();
  }

  // Query to fetch a single book by its ID, restricted to "user" role
  @Query(returns => Book)
//   @Roles('user')
  getBook(@Args('id', { type: () => Int }) id: number): Promise<Book> {
    return this.bookService.findOne(id);
  }

  // Mutation to create a new book, restricted to "admin" role
  @Mutation(returns => Book)
//   @Roles('admin')
  createBook(@Args('bookInput') bookInput: CreateBookInput): Promise<Book> {
    return this.bookService.create(bookInput);
  }

  // Mutation to update an existing book, restricted to "admin" role
  @Mutation(returns => Book)
//   @Roles('admin')
  updateBook(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateBookInput') updateBookInput: UpdateBookInput,
  ): Promise<Book> {
    return this.bookService.update(id, updateBookInput);
  }

  // Mutation to delete a book by its ID, restricted to "admin" role
  @Mutation(returns => Boolean)
  deleteBook(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
    return this.bookService.remove(id);
  }
}


