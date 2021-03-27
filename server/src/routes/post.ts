// all routes relating to posts

import { Request, Response, Router } from 'express';
import { getConnection } from 'typeorm';
import Post from '../entity/Post';

export default function PostRouter()
{
    const router = Router();
    const connection = getConnection();
    //const userRepo = connection.getRepository(User);
    const postRepo = connection.getRepository(Post);

    // expect 1) query (search text)
    router.post('/search', async (req: Request, res: Response) =>
    {
        let posts = await postRepo.createQueryBuilder("post")
            .where("post.title LIKE :query", { query: `%${req.body.query}%` })
            .getManyAndCount();

        res.status(200).json(posts);
    });

    // expects 1) posts[] <- arr of post UUIDs
    router.post('/get', async (req: Request, res: Response) =>
    {
        let posts: Post[] = [];

        for (let idx = 0; idx < req.body.posts?.length; idx++)
        {
            const postID = req.body.posts[idx];

            let post = await postRepo.findOne({ id: postID });
            posts.push(post!);
        }

        res.status(200).json(posts);
    });

    return router;
}