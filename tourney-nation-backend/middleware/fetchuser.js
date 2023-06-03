const jwt = require('jsonwebtoken');
require('dotenv').config()

const fetchuser = (req, res, next) => {
  // Get the user from the JWT token and add id to the req object
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).send({ error: 'Please authenticate using a valid token' });
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    return res.status(401).send({ error: 'Please authenticate using a valid token' });
  }
};
 
module.exports = fetchuser;

