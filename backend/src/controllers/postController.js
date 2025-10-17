const Post = require('../models/Post');
const Comment = require('../models/Comment');

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('user', 'name avatar')
      .sort('-createdAt')
      .limit(20);

    const formattedPosts = posts.map(post => ({
      id: post._id,
      user_id: post.user._id,
      user_name: post.user.name,
      user_avatar: post.user.avatar,
      content: post.content,
      image_url: post.imageUrl,
      video_url: post.videoUrl,
      likes_count: post.likesCount,
      comments_count: post.commentsCount,
      shares_count: post.sharesCount,
      is_liked: post.likes.includes(req.user._id),
      created_at: post.createdAt
    }));

    res.json({ success: true, posts: formattedPosts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createPost = async (req, res) => {
  try {
    const post = await Post.create({
      user: req.user._id,
      content: req.body.content,
      imageUrl: req.body.image_url,
      videoUrl: req.body.video_url,
      tags: req.body.tags
    });

    res.status(201).json({ success: true, post });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (post.likes.includes(req.user._id)) {
      post.likes = post.likes.filter(id => id.toString() !== req.user._id.toString());
      post.likesCount--;
    } else {
      post.likes.push(req.user._id);
      post.likesCount++;
    }
    
    await post.save();
    res.json({ success: true, likesCount: post.likesCount });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.commentPost = async (req, res) => {
  try {
    const comment = await Comment.create({
      post: req.params.id,
      user: req.user._id,
      content: req.body.content
    });

    await Post.findByIdAndUpdate(req.params.id, { $inc: { commentsCount: 1 } });

    res.status(201).json({ success: true, comment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
