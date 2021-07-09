const mongoose = require('mongoose')
const usersSchema = new mongoose.Schema({
    login: String,
    password: String,
    token: String
})

const usersModel = mongoose.model('users', usersSchema)

module.exports = usersModel;