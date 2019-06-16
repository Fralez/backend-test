const bcrypt = require('bcrypt')

const User = require('../models/user')

const { ObjectID } = require('mongodb')

module.exports = {
  index: async (req, res, next) => {
    const users = await User.find({})

    res.status(200).json({ data: users })
  },

  postUser: async (req, res, next) => {
    try {
      const userData = req.body

      await bcrypt.hash(userData.password.toString(), 10, async (err, hash) => {
        if(err) return res.status(400).json({ error: err.message });
  
        userData.password = hash
        const newUser = new User(userData)
        await newUser.save()
        
        return res.status(201).json({ data: newUser })
      })
    } catch (error) {
      return res.status(400).json({ error: 'Bad request.' })      
    }
  },

  deleteUser: async (req, res, next) => {
    const { userId } = req.params

    if (!ObjectID.isValid(userId)) return res.status(400).json({ error: 'Bad request.' });

    const deletedUser = await User.findByIdAndDelete(userId)

    return res.status(200).json({ data: deletedUser })
  },

  logIn: async (req, res, next) => {
    const { username, password } = req.body

    try {
      const user = await User.find({ username: username })
      
      if(!user[0]) return res.status(400).json({ isLogin: false, error: 'Not found.' });

      await bcrypt.compare(password.toString(), user[0].password).then(async isOk => {
        if(isOk) {
          return res.status(200).json({ isLogin: true, data: user })
        } else {
          return res.status(404).json({ isLogin: false, error: 'Failed Sign In.' })
        }
      })
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }
}