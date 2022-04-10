import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'book_api',
  entities: [__dirname + '/../**/*.entity.{js,ts}'], // folderConfig + 'keluarSatu/scanFolder/scanFile.entity.{js,ts}'
  synchronize: true, // Untuk sinkronisasi entity dengan database
};
