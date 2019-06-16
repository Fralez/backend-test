const express = require('express')
const Router = express.Router()

const controller = require('../controllers/user')

/**
 * METHOD: GET
 * DESCRIPTION: Gets all the users
 * ROUTE: HOST/user
 */
Router.get('/', controller.index)

/**
 * METHOD: POST
 * DESCRIPTION: Creates a user
 * BODY: User Model
 * ROUTE: HOST/user
 */
Router.post('/', controller.postUser)

/**
 * METHOD: DELETE
 * DESCRIPTION: Deletes the user with the given ID
 * ROUTE: HOST/user/:userId
 */
Router.delete('/:userId', controller.deleteUser)

/**
 * METHOD: POST
 * DESCRIPTION: Performs the log in of a user
 * BODY: { username: String, password: String }
 * ROUTE: HOST/user/login
 */
Router.post('/login', controller.logIn)


module.exports = Router