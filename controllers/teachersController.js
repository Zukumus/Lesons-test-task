const { Lessons, Students, Teachers, TeachersLessons, StudentsLessons } = require('../models/models');
const ApiError = require('../error/ApiError');

class TeacherController {

   async create(req, res, next) {
      try {
         const { name, } = req.body
         const teacher = await Teachers.create({ name })
         return res.json(teacher)
      } catch (e) {
         next(ApiError.badRequest(e.message))
      }
   };
   async findAll(req, res, next) {
      try {
         const teachers = await Teachers.findAll()
         return res.json(teachers)
      } catch (e) {
         next(ApiError.badRequest(e.message))
      }
   };
   async getOne(req, res, next) {
      try {
         const { id } = req.params
         const teacher = await Teachers.findOne({
            where: { id },
            attributes: ['id', 'name'],
            include: {
               model: TeachersLessons,
               attributes: ['dateLesson', 'daysLessons', 'lessonsCount', 'teacherId', 'lessonId', 'status'],
               include: [{
                  model: Students,
                  attributes: ['id', 'name',],
                  StudentsLessons,
                  through: { attributes: ['teachersLessonId', 'visit'] },
               },
                  Lessons,
               ]
            }
         });
         return res.json(teacher)
      } catch (e) {
         next(ApiError.badRequest(e.message))
      }
   };

   async update(req, res, next) {
      try {
         const { id } = req.body
         const updateTeacher = await Teachers.update(req.body, {
            where: { id: id }
         })
         return res.json(req.body)
      } catch (e) {
         next(ApiError.badRequest(e.message))
      }
   };


   async delete(req, res, next) {
      try {
         const { id } = req.params
         const deleteTeacher = await Teachers.destroy({
            where: { id },
         })
         return res.json(deleteTeacher)
      } catch (e) {
         next(ApiError.badRequest(e.message))
      }
   };


};

module.exports = new TeacherController()