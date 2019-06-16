const { Schema, model } = require('mongoose')

const eventSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  dates: {
    type: [{
      type: String
    }],
    validate: [validateDates, 'Enter a minimum of 1 date']
  },
  location: {
    type: String,
    required: true
  },
  highlight: {
    type: Boolean,
    required: true
  },
  eventImage: {
    type: String,
    required: true
  }
})

function validateDates(val) {
  return val.length > 0
}

const Event = model('Event', eventSchema)

module.exports = Event