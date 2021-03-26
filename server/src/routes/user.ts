// all routes for things you can do with the user

import { Request, Response, Router } from 'express';
import { getConnection } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import User from '../entity/User';
import Post from '../entity/Post';

// skipping most validation here, so be careful!
export default function UserRouter()
{
    const router = Router();
    const connection = getConnection();
    const userRepo = connection.getRepository(User);
    const postRepo = connection.getRepository(Post);

    // get all data about a user - DOES NOT CHECK IF ID IS VALID
    router.get("/:id", async (req: Request, res: Response) =>
    {
        const user = await userRepo.findOne({ id: req.params.id });
        res.send(user);
    });

    // add a friend - DOES NOT CHECK IF FRIEND IS ADDED
    router.get("/:id/addFriend/:friendID", async (req: Request, res: Response) =>
    {
        const user = await userRepo.findOne({ id: req.params.id });

        if (user)
        {
            user.friends?.push(req.params.friendID);
            await userRepo.save(user);
            res.status(200).json({ message: "friend added", success: true });
        }
        else
        {
            res.status(400).json({ message: "No user with the specified ID", success: false });
        }
    });

    // remove a friend - DOES NOT CHECK IF FRIEND EXISTS
    router.delete("/:id/delFriend/:friendID", async (req: Request, res: Response) =>
    {
        const user = await userRepo.findOne({ id: req.params.id });

        if (user)
        {
            user.friends?.splice(user.friends?.indexOf(req.params.friendID), 1);
            await userRepo.save(user);
            res.status(200).json({ message: "friend removed", success: true });
        }
        else
        {
            res.status(400).json({ message: "No user with the specified ID", success: false });
        }
    });

    // expecting POST request to include:
    // 1) title, description, duration
    router.post('/:id/newPost', async (req: Request, res: Response) =>
    {
        const user = await userRepo.findOne({ id: req.params.id });
        
        if (user)
        {
            // create new post and UUID
            const UUID = uuidv4();
            const post = postRepo.create({ 
                ...req.body, 
                owner: req.params.id,
                ownerDisplayName: user.displayName, 
                id: UUID 
            });

            // update user createdChallenges list
            user.createdChallenges?.push(UUID);
            
            await postRepo.save(post);
            await userRepo.save(user);

            res.send(post);
        }
        else
        {
            res.status(400).json({ message: "No user with the specified ID", success: false });
        }  
    });

    // delete post
    router.delete('/:id/delPost/:postID', async (req: Request, res: Response) =>
    {
        const user = await userRepo.findOne({ id: req.params.id });

        if (user)
        {
            const post = await postRepo.findOne({ id: req.params.postID });

            if (post)
            {
                // remove post with specified ID
                await postRepo.delete({ id: req.params.postID });

                // remove post from user's post list and persist
                user.createdChallenges?.splice(user.createdChallenges?.indexOf(req.params.postID), 1);
                await userRepo.save(user);

                res.status(200).json({ message: "Post deleted successfully", success: true });
            }
            else
            {
                res.status(400).json({ message: "No post with the specified ID", success: false });
            }
        }
        else
        {
            res.status(400).json({ message: "No user with the specified ID", success: false });
        }
    });

    return router;
}