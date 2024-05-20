import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggingMiddleware } from './middleware/logging.middleware';
import { UsersModule } from './modules/users/user.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/nest_ecommerce'), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes("*")
  }
}
