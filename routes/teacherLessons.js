const Router = require('express');
const router = new Router();
const teacherLessons = require('../controllers/TeacherLessonsController')

router.post('/', teacherLessons.Create)
router.get('/', teacherLessons.findAll)
router.get('/:id', teacherLessons.getOne)
router.put('/', teacherLessons.update)

module.exports = router