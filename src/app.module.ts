import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { UsersModule } from './users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetsModule } from './pets/pets.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
  }), BooksModule, UsersModule,
  
  TypeOrmModule.forRoot({
    type: 'sqlite',
    // host: 'localhost',
    // port: 3306,
    // username: 'root',
    // password: 'root',
    database: ':memory:',
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true,
  }),
  
  PetsModule,
  
],
  controllers: [],
  providers: [],
})
export class AppModule {}
