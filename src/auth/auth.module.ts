
// import { Module } from '@nestjs/common';
// import { ConfigModule } from '@nestjs/config';
// import { PassportModule } from '@nestjs/passport';
// import authConfig from '../config/auth.config';
// import { JwtStrategy } from './jwt.strategy';

// @Module({
//   imports: [
//     ConfigModule.forFeature(authConfig),
//     PassportModule.register({ defaultStrategy: 'jwt' }),
//   ],
//   providers: [JwtStrategy],
//   exports: [PassportModule, JwtStrategy],
// })
// export class AuthModule {}




// src/auth/auth.module.ts
import { Module, Global } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';


@Global()
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: () => ({
        secretOrPrivateKey: process.env.AUTH0_CLIENT_SECRET,
        signOptions: {
          expiresIn: '3600s', 
        },
      }),
    }),
  ],
  providers: [JwtStrategy],
  exports: [PassportModule, JwtModule, JwtStrategy],
})
export class AuthModule {}
