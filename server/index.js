 // Index.js is the starting point of our server application
 import express from 'express';
 import bodyParser from 'body-parser';
 import cors from 'cors';
 import dotenv from 'dotenv';
 import mongoose from 'mongoose';

 // Import router we set up in routes/posts.js
 import postRoutes from './routes/posts.js';
 import userRoutes from './routes/users.js';

 // We use express MW to connect the router we imported from posts.js to our application
 // Need to initialize an express app as a function const app = express()
 // -> we can then run methods on that function "express()" such as "app.use"

 const app = express();
 dotenv.config();
 
 // 30mb limit is because we are going to be sending images (can be large files)
 app.use(bodyParser.json({ limit: "30mb", extended: true }));
 app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

 // Need to set cors before setting routes as it enables cross-origin resource sharing and cross-origin requests
 // in this case cross origin means between two localhosts 3000 & 5000
 // we add proxy to package-json in the client folder so our React app sends api requests from FE to localhost://5000
 app.use(cors());
 
 // 1st parameter below sets '/posts' as the starting path for all the routes listed in the 2nd parameter "postRoutes"
 // we define the routes in postRoutes in "routes/posts.js"
 // Basically we define every route inside postRoutes is going to start from "localhost:5000/posts"
 app.use('/posts', postRoutes);
 app.use('/user', userRoutes);

 // what user sees when they go to deployed version
 app.get('/', (req, res) => {
	 res.send('Welcome to Memories API');
	});

 // MongoDB Atlas set up is at 10mins Part 1
 const PORT = process.env.PORT || 5000;

 // useNewUrlParser and useUnifiedTopology are not necessary but we'll get errors/warnings in the console
 mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
     .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
     .catch((error) => console.log(error.message))

 // .set and false makes sure we dont get errors/warnings in the console
mongoose.set('useFindAndModify', false)