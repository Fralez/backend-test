const mongoose = require('mongoose');

(async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/ingsw-events", { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true })
		console.log('DB Connection successful.')
	} catch (err) {
		console.log('Connection Error: ', err)
	}
})()

module.exports = mongoose