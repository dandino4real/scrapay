import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import auth0Config from './config/auth.config';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './db/book-database.db',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    BooksModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true, load: [auth0Config] }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
