import { Post } from "../models/post.models.js";
import { createResponse } from "../utils/response.js";
import { User } from "../models/user.models.js";
import { sendMail } from "../utils/mail.js";
import Application from "../models/application.models.js";

export const createPost = async (req, res) => {
  try {
    const { title, content, wantedLocation, wantedDate } = req.body;
    const userId = req.user.userId; 

    const newPost = await Post.create({
      user: userId,
      title,
      content,
      wantedLocation,
      wantedDate
    });

    const users = await User.find({ location: { $regex: wantedLocation, $options: 'i' } }).select('email');

    users.forEach(user => {
      sendMail(user.email, `New post created by ${req.user.email} in your location: ${wantedLocation} for ${title} for the date ${wantedDate}.`);
    });

    res.status(201).json(createResponse(true, "Post created successfully", newPost));
  } catch (error) {
    res.status(500).json(createResponse(false, "Error creating post"));
  }
}

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('user', 'name email location').sort({ createdAt: -1 });
    res.status(200).json(createResponse(true, "Posts fetched successfully", posts));
  } catch (error) {
    res.status(500).json(createResponse(false, "Error fetching posts"));
  }
}

export const applyForPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.userId;


    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json(createResponse(false, "Post not found"));
    }
    const alreadyApplied = await Application.find({ user: userId, post: postId });

    if (alreadyApplied.length > 0) {
      return res.status(400).json(createResponse(false, "You have already applied for this post"));
    }

    const response = await Application.create({
      user: userId,
      post: postId,
      status: 'pending'
    });

    if(!response) {
      return res.status(500).json(createResponse(false, "Error applying for post"));
    }
    sendMail(post.user.email, `User ${req.user.email} has applied for your post: ${post.title}.`);
    res.status(200).json(createResponse(true, "Application submitted successfully", response));
  } catch (error) {
    res.status(500).json(createResponse(false, "Error applying for post"));
  }
}

