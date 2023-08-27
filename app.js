import express from 'express';
import mongoose from 'mongoose';
import router from './routes/user-routes';
import blogRoute from './routes/blog-route';

const app = express();

app.use(express.json());

app.use('/api/user', router);

app.use('/api/blog', blogRoute);

const port = 4000;

mongoose
  .connect(process.env.DB_URL)
  .then(() =>
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    })
  )
  .then(() => console.log('Connected Db'))
  .catch((err) => console.log(err));

app.get('/api', (req, res, next) => {
  res.send('Hello world!');
});

// const port = 4000;
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

// AjithTeja
