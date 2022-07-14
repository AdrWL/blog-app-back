import {Router} from "express";
import {AdRecord} from "../records/ad.record";
import {NewAdEntity} from "../types";
import {ValidationError} from "../utils/errors";
import {pool} from "../utils/db";

export const adRouter = Router()

    .get('/', async (req, res) => {
        const posts = await AdRecord.listAllArticle();
        res.json({
            posts,
        });
    })

    .get('/edit/:id', async (req, res) => {
        const post = await AdRecord.getOneArticle(req.params.id);
        res.json(post);
    })

    .post('/create', async (req, res, next) => {
        const newPost = new AdRecord(req.body as NewAdEntity);
        await newPost.insertArticle();
        res.json(newPost);
    })

    .put("/", async (req, res) => {
        const id = req.body.id;
        const title = req.body.description;
        await pool.query(
            "UPDATE `blog` SET `description` = ? WHERE id = ?",
            [title, id],
        );
        res.end('Update successfully');
    })

    .delete('/:id', async (req, res) => {
        const post = await AdRecord.getOneArticle(req.params.id);
        if (!post) {
            throw new ValidationError('No find post.');
        }
        await post.delete();
        res.end('Delete successfully');
    })