var express = require('express');
var router = express.Router();
const UsersModel = require('../models/users')
const ArticleModel = require ('../models/article')
const uid2 = require('uid2')
const bcrypt = require('bcrypt')

router.post('/sign-up', async (req, res, next) => {
  const user = await UsersModel.findOne({
    login: req.body.login,
    password: req.body.password
  })
  if (user) {
    res.json({ user_exist: true, status: 409 })
  } else {
    const user = new UsersModel({
      login: req.body.login,
      password: bcrypt.hashSync(req.body.password, 10),
      token: uid2(32)
    })
    const userSaved = await user.save()
    if (userSaved) {
      res.send({ message: 'User saved on database', user_exist: false, user: user, status: 200 })
    }
  }
  
})

router.post('/sign-in', async (req, res) => {
  const email = req.body.emailFromFront
  const pass = req.body.passwordFromFront
  const user = await UsersModel.findOne({
    login: email
  })
  if(user){
    if(bcrypt.compareSync(pass, user.password))
    res.json({login: true, user: user})
  }else{
    res.json({ login: false })
  }
})

router.post('/article', async (req, res) => {
  const title = req.body.title
  const desc = req.body.desc
  const image = req.body.image
  const token = req.body.token
  //console.log(token)
  const user = await UsersModel.findOne({ token: token })
  //console.log(user.id)
  const article = await new ArticleModel({
    title: title,
    desc: desc,
    image: image,
    userArticles: user.id
  })

  const articleSaved = await article.save()
  if(articleSaved){
    res.json({message: 'ok', status: 200})
  }

})

router.get('/articles-by-user/:token', (req, res) => {
  console.log('tokenfromURL:', req.params.token)
  res.send({ result: req.params.token})
})

router.delete('/article/:title', async (req, res) => {
  await ArticleModel.deleteOne({
    title: req.params.title
  })
})  

module.exports = router;
