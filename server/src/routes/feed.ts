// all routes for the home feed

import { Request, Response, Router } from 'express';
import { getConnection } from 'typeorm';
import User from '../entity/User';
import Post from '../entity/Post';

export default function FeedRouter()
{
    const router = Router();
    
    // get X most recent challenges from user's friends
    // will return array of post IDs
    router.get('/loadFeed/:id', async (req: Request, res: Response) => 
    {
        const challengeCount = 5;
        let postArray: Post[] = [];

        // load repos
        const connection = getConnection();

        const userRepo = connection.getRepository(User);
        const postRepo = connection.getRepository(Post);

        // get user
        const user = await userRepo.findOne({ id: req.params.id });

        if (user?.friends)
        {
            // get all friends
            for (let idx = 0; idx < user.friends.length; idx++)
            {
                // get posts up to the challengeCount
                let posts = await postRepo.createQueryBuilder("post")
                .where("post.owner = :id", { id: user.friends[idx] })
                .orderBy({
                    'post.created': 'DESC'
                })
                .getMany();

                if (posts.length > challengeCount)
                {
                    posts.splice(0, challengeCount);
                }

                postArray = postArray.concat(postArray, posts);
            }

            // now, sort the posts within the postArray to get total sort and send it down
            postArray = postArray.sort((a, b) => b.created.valueOf() - a.created.valueOf());

            res.status(200).json(postArray);
        }
        else
        {
            res.status(400).json({ message: "User with provided ID not found", success: false });
        }

    });

    return router;
}