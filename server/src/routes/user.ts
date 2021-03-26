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

    // add a follower
    router.get("/:id/follow/:friendID", async (req: Request, res: Response) =>
    {
        const user = await userRepo.findOne({ id: req.params.id });
        const userToFollow = await userRepo.findOne({ id: req.params.friendID });

        if (user && userToFollow)
        {
            // add userToFollow to user's following
            user.following.push(req.params.friendID);
            await userRepo.save(user);

            // add user to userToFollow's followers
            userToFollow.followers.push(req.params.id);
            await userRepo.save(userToFollow);

            res.status(200).json({ message: "friend added", success: true });
        }
        else
        {
            res.status(400).json({ message: "No user and/or no user to follow with the specified ID", success: false });
        }
    });

    // remove a follower
    router.delete("/:id/unfollow/:friendID", async (req: Request, res: Response) =>
    {
        const user = await userRepo.findOne({ id: req.params.id });
        const userToUnfollow = await userRepo.findOne({ id: req.params.friendID });

        if (user && userToUnfollow)
        {
            // remove userToFollow from user's following
            user.following.splice(user.following.indexOf(req.params.friendID), 1);
            await userRepo.save(user);

            // remove user from userToFollow's followers
            userToUnfollow.followers.splice(userToUnfollow.followers.indexOf(req.params.id), 1);
            await userRepo.save(userToUnfollow);

            res.status(200).json({ message: "friend removed", success: true });
        }
        else
        {
            res.status(400).json({ message: "No user and/or no user to unfollow with the specified ID", success: false });
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