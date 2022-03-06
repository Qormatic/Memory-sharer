// We use middleware to track user actions like "likes", once logged in
// Very similar to the syntax in controllers but on top of req, res here we have "next" 
//...which tells the async function to move to the next task after current task
import jwt from "jsonwebtoken";

const secret = 'test';

// user clicks like button, we check user is allowed to like a post with this MW, and then call "like" controller
// MW is for actions before the controllers
// we export this function and use it in routes/posts.js
const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

	// check token length; less than 500 is ours, more is googleauth
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {      
      decodedData = jwt.verify(token, secret);

      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub;
    }    

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;