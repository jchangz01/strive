// all routes relating to posts

import { Request, Response, Router } from 'express';
import { getConnection } from 'typeorm';
import Post from '../entity/Post';

export default function PostRouter()
{
    const router = Router();
    const connection = getConnection();
    const postRepo = connection.getRepository(Post);

    // expect 1) query (search text)
    router.post('/search', async (req: Request, res: Response) =>
    {
        if (req.body.query)
        {
            let posts = await postRepo.createQueryBuilder("post")
            .where("post.title LIKE :query", { query: `%${req.body.query}%` })
            .getMany();

            res.status(200).json(posts);
        }
        else
        {
            res.status(200).json([]);
        }
    });

    // expects 1) posts[] <- arr of post UUIDs
    router.post('/get', async (req: Request, res: Response) =>
    {
        console.log("hit post get");

        let posts: Post[] = [];

        for (let idx = 0; idx < req.body.posts?.length; idx++)
        {
            const postID = req.body.posts[idx];

            let post = await postRepo.findOne({ id: postID });

            if (post)
            {
                posts.push(post);
            }
        }

        console.log("postsarr", posts);

        res.status(200).json(posts);
    });

    return router;
}