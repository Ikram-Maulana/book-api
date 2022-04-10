import { JwtGuard } from './../guard/jwt.guards';
import { UUIDValidationPipe } from './../pipes/uuid-validation.pipe';
import { Book } from './entity/book.entity';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { FilterBookDto } from './dto/filter-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/users/entity/user.entity';

@Controller('books')
@UseGuards(JwtGuard)
export class BooksController {
  constructor(private booksServices: BooksService) {}

  // Get Books filtered by title, author, category
  @Get()
  async getBooks(
    @Query() filter: FilterBookDto,
    @GetUser() user: User,
  ): Promise<Book[]> {
    return this.booksServices.getBooks(user, filter);
  }

  // Get Book By Id
  @Get('/:id')
  async getBookById(
    @GetUser() user: User,
    @Param('id', UUIDValidationPipe) id: string,
  ): Promise<Book> {
    return this.booksServices.getBookById(user, id);
  }

  // Create Book
  @Post()
  async createBook(
    @GetUser() user: User,
    @Body() payload: CreateBookDto,
  ): Promise<void> {
    return this.booksServices.createBook(user, payload);
  }

  // Update Book
  @Put('/:id')
  async updateBook(
    @GetUser() user: User,
    @Param('id', UUIDValidationPipe) id: string,
    @Body() payload: UpdateBookDto,
  ): Promise<void> {
    return this.booksServices.updateBook(user, id, payload);
  }

  // Delete Book
  @Delete('/:id')
  async deleteBook(
    @GetUser() user: User,
    @Param('id', UUIDValidationPipe) id: string,
  ): Promise<void> {
    return this.booksServices.deleteBook(user, id);
  }
}
