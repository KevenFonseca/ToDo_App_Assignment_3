const viewRouter = require('express').Router()

viewRouter.get('/', (req, res) => {
    res.render('home')
})

viewRouter.get('/login', (req, res) => {
    res.render('login')
})

viewRouter.get('/signup', (req, res) => {
    res.render('signup')
})

viewRouter.get('/dashboard', (req, res) => {
    res.render('dashboard')
})

module.exports = viewRouter