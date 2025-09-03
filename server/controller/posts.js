import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";


export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages);
        console.log(postMessages)
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
export const createPost =  async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage({ ...post, creator: req.userId ,createdAt: new Date().toISOString() });
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};









export const updatePost = async (req, res) =>{
    const {id}=req.params;
    const obj=req.body;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    const updatedPost={...obj,_id:id};

    const post = await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(post);
}
export const deletePost = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    await PostMessage.findByIdAndDelete(id);
    res.json({ message: 'Post deleted successfully.' });
};

export const likePost = async (req, res) => {
    const { id } = req.params;
    if (!req.userId) return res.status(401).send('Unauthenticated');

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    const post = await PostMessage.findById(id);
    const index = post.likes.findIndex((id) => id === String(req.userId));
    if (index === -1) {

        post.likes.push(req.userId);
    }
    else {
        console.log("this")
        post.likes = post.likes.filter((id) => id !== String(req.userId));

    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, { likes: post.likes }, { new: true });


   console.log(post);
     res.json(post);
};

export const getPostsBySearch = async (req, res) => {
try {
        const { searchQuery, tags } = req.query;
        console.log(searchQuery)
        console.log(tags)
        const title = new RegExp(searchQuery, 'i');
console.log(title)
        const posts = await PostMessage.find({ $or: [{ title }, { tags: { $in: tags.split(',') } }] });
   console.log(posts)
        res.status(200).json(posts);
    } catch (error) {

        res.status(404).json({ message: error.message });
    }
}
