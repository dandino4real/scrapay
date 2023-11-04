import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Book } from './entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookInput } from './dto/create-book.input';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { UpdateBookInput } from './dto/update-book.input';

@Injectable()
export class BooksService {
    constructor(@InjectRepository(Book) private booksRepository: Repository<Book>){}


    async create(createBookInput: CreateBookInput): Promise<Book>{
        const newBook = this.booksRepository.create(createBookInput)
        return this.booksRepository.save(newBook)
    }

    async findAll(): Promise<Book[]>{
        return this.booksRepository.find();
    }


    async findOne(id: number): Promise<Book> {
        const book =  await this.booksRepository.findOne({where : {id}})
        if (!book) {
            throw new BadRequestException(`Book with the specified ID ${id} does not exist.`);
        }

        return book
    }


      update(id: number, updateBookInput: UpdateBookInput) {
        return `This action updates a #${id} user`;
      }
    
      remove(id: number) {
        return `This action removes a #${id} user`;
      }

}
