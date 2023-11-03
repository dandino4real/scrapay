import { Injectable } from '@nestjs/common';
import { Book } from './book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookInput } from './dtos/create-Book.input';

@Injectable()
export class BooksService {
    constructor(@InjectRepository(Book) private booksRepository: Repository<Book>){}


    async createBook(bookInput: CreateBookInput): Promise<Book>{
        const newBook = this.booksRepository.create(bookInput)
        return this.booksRepository.save(newBook)
    }

    async findAll(): Promise<Book[]>{
        return this.booksRepository.find();
    }

}
