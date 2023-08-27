import express from 'express';
import {
  addBlog,
  deleteBlog,
  getBlog,
  getBlogs,
  getUserId,
  updateBlog,
} from '../controllers/blog-controller';

const blogRoute = express.Router();

blogRoute.get('/', getBlogs);
blogRoute.post('/add', addBlog);
blogRoute.put('/update/:id', updateBlog);
blogRoute.get('/:id', getBlog);
blogRoute.delete('/:id', deleteBlog);
blogRoute.get('/user/:id', getUserId);

export default blogRoute;
