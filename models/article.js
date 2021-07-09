const mongoose = require('mongoose');

const article = mongoose.Schema({
    title: String,
    desc: String,
    image: String,
    userArticles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }]
})

const articleModel = mongoose.model('article', article)

module.exports = articleModel;