import mongoose from 'mongoose';
import Blog from '../model/Blog';
import User from '../model/Users';

export const getBlogs = async (req, res, next) => {
  let existingBlogs;
  try {
    existingBlogs = await Blog.find();
  } catch (error) {
    return console.log(error);
  }

  if (!existingBlogs) {
    return res.status(404).json({ message: 'No Blogs Found' });
  }

  return res.status(200).json({ blogs: existingBlogs });
};

export const addBlog = async (req, res, next) => {
  const { title, description, image, user } = req.body;
  let existingUser;

  try {
    existingUser = await User.findById(user);
  } catch (error) {
    return console.log(error);
  }

  if (!existingUser) {
    return res.status(400).json({ message: 'User Not Found' });
  }

  const blog = new Blog({
    title,
    description,
    image,
    user,
  });

  try {
    const section = await mongoose.startSession();
    section.startTransaction();
    await blog.save({ section });
    existingUser.blogs.push(blog);
    await existingUser.save({ section });
    await section.commitTransaction();

    // await blog.save();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
  return res.status(200).json({ message: 'blog added Successfully', blog });
};

export const updateBlog = async (req, res, next) => {
  const { title, description } = req.body;
  const blogId = req.params.id;
  let blog;
  try {
    blog = await Blog.findByIdAndUpdate(blogId, {
      title,
      description,
    });
  } catch (error) {
    return console.log('siudfhesugf', error);
  }
  if (!blog) {
    return res.status(404).json({ message: 'Unable to update' });
  }

  return res.status(200).json({ blog });
};

export const getBlog = async (req, res, next) => {
  const blogId = req.params.id;
  let blog;
  try {
    blog = await Blog.findById(blogId);
  } catch (error) {
    return console.log(error);
  }

  if (!blog) {
    return res.status(404).json({ message: 'Blog Not Found' });
  }
  return res.status(200).json({ blog });
};

export const deleteBlog = async (req, res, next) => {
  const blogId = req.params.id;
  let blog;
  try {
    blog = await Blog.findByIdAndRemove(blogId).populate('user');
    await blog.user.blogs.pull(blog);
    await blog.user.save();
  } catch (error) {
    return console.log(error);
  }

  if (!blog) {
    return res.status(500).json({ message: 'blog Not Found To Delete' });
  }
  return res
    .status(200)
    .json({ message: `Succussfully Deleted this blog ${blog.title}` });
};

export const getUserId = async (req, res, next) => {
  const userId = req.params.id;
  // console.log({ userId });
  let userBlogs;
  try {
    userBlogs = await User.findById(userId).populate('blogs');
  } catch (error) {
    return console.log(error);
  }
  if (!userBlogs) {
    return res.status(404).json({ message: 'No Blogs Found' });
  }
  return res.status(200).json({ userBlogs });
};
