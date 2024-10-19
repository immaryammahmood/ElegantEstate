import bcryptjs from 'bcryptjs';
import User from '../models/user.js';
import { errorHandler } from '../utils/error.js';
import Listing from '../models/listing.js';

// A test function to ensure routing is working
export const test = (req, res) => {
  res.json({
    message: "Hello world",
  });
};

// Update user function
export const updateUser = async (req, res, next) => {
  // Check if the user ID in the request matches the one in the token (req.user.id)
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, 'You can only update your own account'));

  try {
    // If the user is updating their password, hash the new password
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    // Find the user by ID and update the fields
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true } // Return the updated user document
    );

    // Destructure the response to exclude the password
    const { password, ...rest } = updateUser._doc; // Using _doc to get the MongoDB document data
    res.status(200).json(rest); // Send the updated user data excluding the password

  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
};

export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id)
      return next(errorHandler(401, 'You can only delete your own account!'));
    try {
      await User.findByIdAndDelete(req.params.id);
      res.clearCookie('access_token');
      res.status(200).json('User has been deleted!');
    } catch (error) {
      next(error);
    }
  };

  export const getUserListings = async (req, res, next) => {
    if (req.user.id === req.params.id) {
      try {
        const listings = await Listing.find({ userRef: req.params.id });
        res.status(200).json(listings);
      } catch (error) {
        next(error);
      }
    } else {
      return next(errorHandler(401, 'You can only view your own listings!'));
    }
  };

  export const getUser = async (req, res, next) => {
    try {
      
      const user = await User.findById(req.params.id);
    
      if (!user) return next(errorHandler(404, 'User not found!'));
    
      const { password: pass, ...rest } = user._doc;
    
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  };
