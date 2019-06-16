const Event = require('../models/event')

const { ObjectID } = require('mongodb')

module.exports = {
  index: async (req, res, next) => {
    const events = await Event.find({})

    return res.status(200).json({ data: events })
  },

  indexPaginated: async (req, res, next) => {
    const { pageNo } = req.params
    const { size } = req.query
    const limit = !size ? 6 : size

    const events = await Event.find({}, {}, { skip: (pageNo - 1) * limit, limit: parseInt(limit) })

    return res.status(200).json({ data: events })
  },

  getEvent: async (req, res, next) => {
    const { eventId } = req.params

    if (!ObjectID.isValid(eventId)) return res.status(400).json({ error: 'Bad request.' });

    try {
      const event = await Event.findById(eventId)
      if (event) {
        return res.status(200).json({ data: event })
      } else {
        return res.status(404).json({ error: 'Not found.' })
      }

    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  },

  postEvent: async (req, res, next) => {
    try {
      const eventData = req.body

      const newEvent = new Event(eventData)
      await newEvent.save()
        
      return res.status(201).json({ data: newEvent })
    } catch (error) {
      return res.status(400).json({ error: 'Bad request.' })      
    }
  },

  deleteEvent: async (req, res, next) => {
    const { eventId } = req.params

    if (!ObjectID.isValid(eventId)) return res.status(400).json({ error: 'Bad request.' });

    const deletedEvent = await Event.findByIdAndDelete(eventId)

    return res.status(200).json({ data: deletedEvent })
  },

  highlightedEvents: async (req, res, next) => {
    const events = await Event.find({ highlight: true })
    
    return res.status(200).json({ data: events })
  }

}