const express = require('express');
const validator = require('express-validator');
const jwt = require('jsonwebtoken'); 

/**
 * Express router to mount login related functions.
 * @type {object}
 * @const
 */
const router = express.Router();

/**
 * This API endpoint mounted on the login router responds to GET request to the '/login' route. It has the responsibility of sanitizing
 * the input arguments recieved, and then validating if they belong to a user in the database. If they do, the client will be notified
 * that verification was succesful and to redirect to the appropriate view. 
 * 
 * @name post/login
 * @function
 * @param {string} path - Express path 
 * @param {callback} middleware - Express middleware
 */
router.post('/', [
    validator.body('username').escape(),
    validator.body('password').escape(),

    async (req, res, next) => {
        // pseudocode:
        // from the request body, take the email or username
        // and search in the database for this username
        // if the user is found, then convert plain text pw 
        // to cryptographically secure pw and compare to pw held
        // for this user object. If incorrect, send back an error
        // detailing that pw is incorrect but user found. If correct,
        // then signal to frontend to redirect to the users home page. 
        // res.json({'res': 'response!'});
    }
]
); 

exports.login_router = router; 