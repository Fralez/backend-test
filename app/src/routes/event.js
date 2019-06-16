const express = require('express')
const Router = express.Router()

const controller = require('../controllers/event')

/**
 * METHOD: GET
 * DESCRIPTION: Gets all the events
 * ROUTE: HOST/event
 */
Router.get('/', controller.index)

/**
 * METHOD: GET
 * DESCRIPTION: Gets all the events (with pagination)
 * ROUTE: HOST/event/page/:pageNo
 */
Router.get('/page/:pageNo', controller.indexPaginated)

/**
 * METHOD: GET
 * DESCRIPTION: Gets the event with the given ID
 * ROUTE: HOST/event/:eventId
 */
Router.get('/:eventId', controller.getEvent)

/**
 * METHOD: POST
 * DESCRIPTION: Creates an event
 * BODY: Event Model
 * ROUTE: HOST/event
 */
Router.post('/', controller.postEvent)

/**
 * METHOD: DELETE
 * DESCRIPTION: Deletes the event with the given ID
 * ROUTE: HOST/event/:eventId
 */
Router.delete('/:eventId', controller.deleteEvent)

/**
 * METHOD: GET
 * DESCRIPTION: Gets all the highlighted events
 * ROUTE: HOST/event/get/highlight
 */
Router.get('/get/highlight', controller.highlightedEvents)

module.exports = Router