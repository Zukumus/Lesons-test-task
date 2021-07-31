const Router = require('express');
const studentLessons = require('./studentLessons');
const teachersLessons = require('./teacherLessons');
const lessons = require('./lessons');
const students = require('./students');
const teachers = require('./teachers');


const router = new Router();

router.use('/studentLessons', studentLessons);
router.use('/teachersLessons', teachersLessons);
router.use('/lessons', lessons);
router.use('/students', students);
router.use('/teachers', teachers);

module.exports = router