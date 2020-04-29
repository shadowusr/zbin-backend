import {Module} from '@nestjs/common';
import {GraphQLModule} from '@nestjs/graphql';
import {GraphqlOptions} from './graphql.options';
import {PasteModule} from './paste/paste.module';
import {MongooseModule} from "@nestjs/mongoose";
import {ConfigModule} from "@nestjs/config";


@Module({
    imports: [
        ConfigModule.forRoot(),
        GraphQLModule.forRootAsync({
            useClass: GraphqlOptions,
        }),
        PasteModule,
        MongooseModule.forRoot(process.env.MONGODB_URI)
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}