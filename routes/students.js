const Router = require('express');
const router = new Router();
const students = require('../controllers/studentsController');



router.post('/', students.create);
router.get('/', students.findAll);
router.get('/:id', students.getOne);
router.put('/', students.update);
router.delete('/', students.delete);

module.exports = router