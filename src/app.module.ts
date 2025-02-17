import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';
import { SessoesModule } from './sessoes/sessoes.module';
import { DatabaseModule } from './database/database.module';
import { PermissoesModule } from './permissoes/permissoes.module';
import { ResponseLoggerMiddleware } from 'middlewares/response.middleware';
import { GrupoUsuariosModule } from './grupo-usuarios/grupo-usuarios.module';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { EncryptionDecryptionMiddleware } from 'middlewares/encryptionDecryprion.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, }),
    DatabaseModule,
    AuthModule,
    UsuarioModule,
    SessoesModule,
    PermissoesModule,
    GrupoUsuariosModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(EncryptionDecryptionMiddleware, ResponseLoggerMiddleware)
      .exclude({ path: 'encrypt', method: RequestMethod.ALL }, { path: 'decrypt', method: RequestMethod.ALL })
      .forRoutes('*');
  }
}