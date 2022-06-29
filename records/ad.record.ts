import {NewAdEntity, NewArticleAdEntity} from "../types";
import {ValidationError} from "../utils/errors";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import {v4 as uuid} from 'uuid';

type AdRecordResults = [NewArticleAdEntity[], FieldPacket[]];

export class AdRecord implements NewArticleAdEntity {
    public id?: string;
    public title: string;
    public description: string;
    public markdown: string;
    public createdAt: Date;

    constructor(obj: NewAdEntity) {
        if (!obj.title || obj.title.length > 100) {
            throw new ValidationError('Nazwa postu nie może być pusta, ani przekraczać 100 znaków.');
        }
        this.id = obj.id;
        this.title = obj.title;
        this.description = obj.description;
        this.markdown = obj.markdown;
        this.createdAt = obj.createdAt;
    }

    static async getOneArticle(id: string): Promise<AdRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `blog` WHERE `id` = :id", {
            id,
        }) as AdRecordResults;

        return results.length === 0 ? null : new AdRecord(results[0]);
    }

    async insertArticle(): Promise<string> {
        if (!this.id) {
            this.id = uuid();
        } else {
            throw new Error('Cannot insert something that is already inserted!');
        }
        await pool.execute("INSERT INTO `blog`(`id`, `title`, `description`, `markdown`, `createdAt`) VALUES(:id, :title, :description, :markdown, :createdAt)", this);

        return this.id;
    };

    static async listAllArticle(): Promise<NewArticleAdEntity[]> {
        const [results] = (await pool.execute("SELECT * FROM `blog` ORDER BY `createdAt` ASC")) as AdRecordResults;
        return results.map(obj => new AdRecord(obj));
    }

    async updateArticle(): Promise<void> {
        await pool.execute("UPDATE `blog` SET `blog`(`id`, `title`, `description`, `markdown`) VALUES(:id, :title, :description, :markdown)", this);
    }
}