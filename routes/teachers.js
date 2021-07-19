const Router = require('express');
const router = new Router();

const teacher = require('../controllers/teachersController');



router.post('/', teacher.create);
router.get('/', teacher.findAll);
router.get('/:id', teacher.getOne);
router.put('/', teacher.update);
router.delete('/', teacher.delete);

module.exports = router