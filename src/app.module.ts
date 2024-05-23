import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggingMiddleware } from './middleware/logging.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { User, UserDocument, UserSchema } from './modules/users/schema/user.schema';
import { UsersModule } from './modules/users/user.module';
import { genPersonalKey } from './utils/hash.util';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/nest_ecommerce'),
    MongooseModule.forFeatureAsync([{
      name: User.name,
      useFactory: () => {
        const schema = UserSchema;
        console.log("Hello");
        schema.pre('save', async function (this: UserDocument) {
          console.log(this)
          if (this.isModified('password')) {
            this.password = await bcrypt.hash(this.password, 10);
          }

          if (this.isNew) {
            this.personalKey = await genPersonalKey();
          }
        });

        schema.methods.logout = async function (this: UserDocument) {
          this.personalKey = await genPersonalKey();
          this.save();
        }

        return schema;
      }
    }]),
    UsersModule,
    AuthModule,
    CategoriesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes("*")
  }
}
