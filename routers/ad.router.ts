import {Router} from "express";
import {AdRecord} from "../records/ad.record";
import {NewAdEntity} from "../types";

export const adRouter = Router()

    .get('/edit/:id', async (req, res) => {

    })

    .get('/api', async (req, res) => {
        const posts = await AdRecord.listAllArticle();

        res.json({
            posts,
        });
    })

    .post('/api/create', async (req, res, next) => {
        const newPost = new AdRecord(req.body as NewAdEntity);
        await newPost.insertArticle();

        res.json(newPost);
    })

    .put('/:id', async (req, res, next) => {

    })

    .delete('/:id', async (req, res) => {

    })

