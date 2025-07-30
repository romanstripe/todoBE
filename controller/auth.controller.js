const { request } = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const authController = {};

authController.authenticate = (req, res, next) => {
  try {
    const tokenString = req.headers.authorization; //Bearer a
    if (!tokenString) {
      throw new Error('Invalid token');
    } else {
      const token = tokenString.replace('Bearer ', '');
      jwt.verify(token, JWT_SECRET_KEY, (error, payload) => {
        if (error) {
          throw new Error('Invalid token');
        }
        //res.status(200).json({ status: 'Success', userID: payload._id });
        req.userId = payload._id;
        // next 로 넘기기 위해 req에 새로운 요소 userID 추가
      });
      next();
    }
  } catch (error) {
    res.status(400).json({ status: 'Failed', error: error.message });
  }
};
module.exports = authController;

//middleware
