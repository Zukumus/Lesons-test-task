const Router = require('express');
const router = new Router();
const lessons = require('../controllers/lessonsController');



router.post('/', lessons.create);
router.get('/', lessons.findAll);
router.get('/:id', lessons.getOne);
router.put('/', lessons.update);
router.delete('/', lessons.delete);


module.exports = router