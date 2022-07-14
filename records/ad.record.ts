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
    public createdAt?: Date | number | string;

    constructor(obj: NewAdEntity) {
        if (!obj.title || obj.title.length > 100) {
            throw new ValidationError('Nazwa postu nie może być pusta, ani przekraczać 100 znaków.');
        }
        if (!obj.description || obj.description.length < 0) {
            throw new ValidationError('Opis postu nie może być pusty.');
        }
        this.id = obj.id;
        this.title = obj.title;
        this.description = obj.description;
        this.createdAt = obj.createdAt;
    }
    static async getOneArticle(id: string): Promise<AdRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `blog` WHERE `id` = :id", {
            id,
        }) as AdRecordResults;
        return results.length === 0 ? null : new AdRecord(results[0]);
    }
    async insertArticle(): Promise<any> {
        if (!this.id) {
            this.id = uuid();
            if (!this.createdAt) {
                this.createdAt = new Date().toISOString().slice(0, 10)
            }
            await pool.execute("INSERT INTO `blog`(`id`, `title`, `description`, `createdAt`) VALUES(:id, :title, :description, :createdAt)", this);
            return [this.id, this.createdAt];
        }
    };
    static async listAllArticle(): Promise<NewArticleAdEntity[]> {
        const [results] = (await pool.execute("SELECT * FROM `blog` ORDER BY `createdAt` DESC")) as AdRecordResults;
        return results.map(obj => new AdRecord(obj));
    }
    async delete(): Promise<void> {
        await pool.execute("DELETE FROM `blog` WHERE `id` = :id", {
            id: this.id,
        });
    }
}