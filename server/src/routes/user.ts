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

        // TODO: REMOVE PASSWORD FROM USER OBJECT HERE

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

    // create a new challenge
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
                id: UUID,
                challengers: [
                    {
                        id: req.params.id,
                        displayName: user.displayName,
                        progress: 0,
                        blurb: "",
                        blurbUpdateTime: 0
                    }
                ]
            });

            // update user createdChallenges and joinedChallenges list
            user.createdChallenges?.push(UUID);
            user.joinedChallenges?.push(UUID);
            
            await postRepo.save(post);
            await userRepo.save(user);

            res.send(post);
        }
        else
        {
            res.status(400).json({ message: "No user with the specified ID", success: false });
        }  
    });

    // delete existing challenge
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

    // join another challenge - DOES NOT CHECK IF POST EXISTS
    router.get('/:id/join/:postID', async (req: Request, res: Response) =>
    {
        const user = await userRepo.findOne({ id: req.params.id });
        const post = await postRepo.findOne({ id: req.params.postID });

        if (user && post)
        {
            user.joinedChallenges.push(req.params.postID);

            console.log("post challengers", post.challengers);

            post.challengers.push({
                id: req.params.id,
                displayName: user.displayName,
                progress: 0,
                blurb: "",
                blurbUpdateTime: 0
            });

            await userRepo.save(user);
            await postRepo.save(post);

            res.status(200).json({ message: "Joined post successfully", success: true });
        }
        else
        {
            res.status(400).json({ message: "No user and/or post with the specified ID", success: false });
        }
    });

    // leave a challenge - DOES NOT CHECK IF POST EXISTS OR IF IT IS IN THE JOINEDCHALLENGES ARR
    router.get('/:id/leave/:postID', async (req: Request, res: Response) =>
    {
        const user = await userRepo.findOne({ id: req.params.id });
        const post = await postRepo.findOne({ id: req.params.postID });

        if (user && post)
        {
            user.joinedChallenges?.splice(user.joinedChallenges?.indexOf(req.params.postID), 1);
            post.challengers?.splice(post.challengers?.map(e => e.id).indexOf(req.params.id), 1);
            
            await userRepo.save(user);
            await postRepo.save(post);

            res.status(200).json({ message: "Left post successfully", success: true });
        }
        else
        {
            res.status(400).json({ message: "No user and/or post with the specified ID", success: false });
        }
    });

    // like a challenge - DOES NOT CHECK IF POST EXISTS
    router.get('/:id/like/:postID', async (req: Request, res: Response) =>
    {
        const user = await userRepo.findOne({ id: req.params.id });
        const post = await postRepo.findOne({ id: req.params.postID });

        if (user && post)
        {
            user.likedChallenges?.push(req.params.postID);
            post.likes += 1;

            await userRepo.save(user);
            await postRepo.save(post);

            res.status(200).json({ message: "Liked post successfully", success: true });
        }
        else
        {
            res.status(400).json({ message: "No user and/or post with the specified ID", success: false });
        }
    });

    // unlike a challenge - DOESNT CHECK IF POST EXISTS OR IF ITS ALREADY BEEN UNLIKED
    router.get('/:id/unlike/:postID', async (req: Request, res: Response) =>
    {
        const user = await userRepo.findOne({ id: req.params.id });
        const post = await postRepo.findOne({ id: req.params.postID });

        if (user && post)
        {
            user.likedChallenges?.splice(user.likedChallenges?.indexOf(req.params.postID), 1);
            post.likes -= 1;

            await userRepo.save(user);
            await postRepo.save(post);

            res.status(200).json({ message: "Unliked post successfully", success: true });
        }
        else
        {
            res.status(400).json({ message: "No user and/or post with the specified ID", success: false });
        }
    });

    // expects { progress: [new progress], blurb: [new blurb] }
    router.post('/:id/updateProgress/:postID', async (req: Request, res: Response) =>
    {
        let user = await userRepo.findOne({ id: req.params.id });
        let post = await postRepo.findOne({ id: req.params.postID });

        if (user && post)
        {
            const idx = post.challengers?.map(e => e.id).indexOf(req.params.id);

            post.challengers[idx].progress = req.body.progress;
            post.challengers[idx].blurb = req.body.progress;
            post.challengers[idx].blurbUpdateTime = new Date().getTime();

            await postRepo.save(post);

            // skip sending success message, and send modified post data instead
            // to avoid second fetch
            res.status(200).json(post);
        }
        else
        {
            res.status(400).json({ message: "No user and/or post with the specified ID", success: false });
        }
    });

    return router;
}