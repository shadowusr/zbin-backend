
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class PasteInput {
    expiresAfter?: number;
    language?: string;
    text: string;
    url?: string;
    isPublic?: boolean;
    title?: string;
}

export class Paste {
    createdAt: string;
    expiresAt: string;
    language?: string;
    views: number;
    text: string;
    url: string;
    isPublic?: boolean;
    title: string;
}

export abstract class IQuery {
    abstract isUrlAvailable(url: string): boolean | Promise<boolean>;

    abstract getPasteByUrl(url: string): Paste | Promise<Paste>;

    abstract getRecentPastes(count: number): Paste[] | Promise<Paste[]>;
}

export abstract class IMutation {
    abstract createPaste(pasteInput: PasteInput): Paste | Promise<Paste>;

    abstract incrementViews(url: string): Paste | Promise<Paste>;
}
