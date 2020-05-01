import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";
import {SanitizePipe} from "./sanitize.pipe";

//process.env.NODE_ENV = 'production';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(), new SanitizePipe());
  app.enableCors();
  //app.use(bodyParser.json({type: 'text/html'}))
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  //console.log(process.env);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
