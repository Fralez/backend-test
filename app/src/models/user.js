const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
})

// Apply the uniqueValidator plugin to userSchema.
const uniqueValidator = require('mongoose-unique-validator')
userSchema.plugin(uniqueValidator, { type: 'mongoose-unique-validator' })

const User = model('User', userSchema)

module.exports = User