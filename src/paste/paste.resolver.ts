import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {PasteInputDto} from "./paste-input.dto";
import {
    HttpException,
    HttpStatus,
    Injectable
} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {PasteInterface as Paste} from "./paste.interface";

@Resolver('Paste')
@Injectable()
export class PasteResolver {
    constructor(@InjectModel('Paste') private pasteModel: Model<Paste>) {
    }

    randomString(length) {
        let result = '';
        const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    @Query()
    async isUrlAvailable(@Args('url') url: string) {
        return !(await this.pasteModel.findOne({url: url}).exec());
    }

    @Query()
    async getPasteByUrl(@Args('url') url: string) {
        const paste = await this.pasteModel.findOne({url: url}).exec();
        if (!paste) {
            throw new HttpException('Paste not found.', HttpStatus.NOT_FOUND);
        }
        return paste;
    }

    @Query()
    async getRecentPastes(@Args('count') count: number) {
        if (count <= 0) {
            throw new Error("Count has to be a positive integer!");
        }
        return await this.pasteModel.find({isPublic: true}).sort({createdAt: "desc"}).limit(count).exec();
    }

    @Mutation()
    async incrementViews(@Args('url') url: string) {
        const paste = await this.pasteModel.findOne({url: url}).exec();
        if (!paste) {
            throw new HttpException('Paste not found.', HttpStatus.NOT_FOUND);
        }
        paste.views++;
        await paste.save();
        return paste;
    }


    @Mutation()
    async createPaste(@Args('pasteInput') pasteInput: PasteInputDto) {
        let url : string;
        if (!pasteInput.expiresAfter) {
            pasteInput.expiresAfter = 24 * 60 * 60;
        }
        if (pasteInput.url?.length >= 4 && pasteInput.expiresAfter > 0) {
            url = pasteInput.url.toLowerCase();

            if (await this.pasteModel.findOne({url: url}).exec()) {
                throw new Error("URL '" + url + "' is busy. Try another one.");
            }
        } else {
            url = this.randomString(4);
            while (await this.pasteModel.findOne({url: url}).exec()) {
                url = this.randomString(4);
            }
        }

        const currentDate = new Date();
        const newPaste = {
            createdAt: currentDate,
            expiresAt: pasteInput.expiresAfter < 0 ? new Date(8640000000000000) : new Date(currentDate.getTime() + pasteInput.expiresAfter * 1000),
            language: pasteInput.language,
            views: 1,
            text: pasteInput.text,
            url: url,
            isPublic: pasteInput.isPublic ?? false,
            title: pasteInput.title ?? "Paste"
        } as Paste;
        const result = new this.pasteModel(newPaste);

        return result.save();
    }
}