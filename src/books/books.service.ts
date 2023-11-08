import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';

@Injectable()
export class BooksService {
  constructor(@InjectRepository(Book) private booksRepository: Repository<Book>) {}

  // Create a new book
  async create(createBookInput: CreateBookInput): Promise<Book> {
    const newBook = this.booksRepository.create(createBookInput);
    return this.booksRepository.save(newBook);
  }

  // Retrieve a list of all books
  async findAll(): Promise<Book[]> {
    return this.booksRepository.find();
  }

  // Retrieve a single book by its ID
  async findOne(id: number): Promise<Book> {
    const book = await this.booksRepository.findOne({ where: { id } });
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} does not exist.`);
    }
    return book;
  }

  // Update an existing book by its ID
  async update(id: number, updateBookInput: UpdateBookInput): Promise<Book> {
    const existingBook = await this.booksRepository.findOne({ where: { id } });

    if (!existingBook) {
      throw new NotFoundException(`Book with ID ${id} does not exist.`);
    }

    // Update the book fields based on the provided input
    this.booksRepository.merge(existingBook, updateBookInput);

    // Save the updated book
    return this.booksRepository.save(existingBook);
  }

  // Remove a book by its ID and return a boolean to indicate success
  async remove(id: number): Promise<boolean> {
    const existingBook = await this.booksRepository.findOne({ where: { id } });

    if (!existingBook) {
      throw new NotFoundException(`Book with ID ${id} does not exist.`);
    }

    await this.booksRepository.remove(existingBook);

    // Return true to indicate successful deletion
    return true;
  }
}
