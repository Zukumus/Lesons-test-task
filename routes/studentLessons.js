const Router = require('express');
const router = new Router();
const studentLessons = require('../controllers/studientLessonsController')

router.post('/', studentLessons.Create)
router.get('/', studentLessons.findAll)
router.get('/:id', studentLessons.getOne)
router.put('/', studentLessons.update)

module.exports = router