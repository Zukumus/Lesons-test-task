const Router = require('express');
const infoLessons = require('./infoLessons');
const lessons = require('./lessons');
const students = require('./students');
const teachers = require('./teachers');


const router = new Router();

router.use('/lessons', lessons)
router.use('/students', students)
router.use('/teachers', teachers)
router.use('/infoLessons', infoLessons)

module.exports = router