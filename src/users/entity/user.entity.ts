import { RefreshToken } from './../../auth/entity/refresh-token.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Book } from 'src/books/entity/book.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user, {
    eager: true, // Relasinya akan otomatis di load ketika memanggil user
  })
  refreshTokens: RefreshToken[];

  @OneToMany(() => Book, (book) => book.user)
  books: Book[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
