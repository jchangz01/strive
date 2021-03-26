// all routes relating to posts

// make a route to get X amount of posts based on post IDs
// make a search route for posts

import { Request, Response, Router } from 'express';
import { getConnection } from 'typeorm';
import User from '../entity/User';
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

    return router;
}