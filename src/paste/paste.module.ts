import { Module } from '@nestjs/common';
import { PasteResolver } from './paste.resolver';
import {MongooseModule} from "@nestjs/mongoose";
import {PasteSchema} from "./paste.schema";

@Module({
  imports: [
      MongooseModule.forFeature([{name: "Paste", schema: PasteSchema}])
  ],
  providers: [PasteResolver]
})
export class PasteModule {}
