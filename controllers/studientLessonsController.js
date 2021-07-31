const { Lessons, Students, Teachers, TeachersLessons, StudentsLessons } = require('../models/models');
const ApiError = require('../error/ApiError');
const studentsController = require('./studentsController');


class StudentLessonsController {

   async Create(req, res, next) {
      try {
         const { visit, studentId, teachersLessonId } = req.body;
         const lessonStudent = await StudentsLessons.create({ visit, studentId, teachersLessonId });
         return res.json(lessonStudent)

      } catch (e) {
         next(ApiError.badRequest(e.message))

      }
   }
   async findAll(req, res, next) {
      try {
         const lessonStudent = await StudentsLessons.findAll()
         return res.json(lessonStudent)
      } catch (e) {
         next(ApiError.badRequest(e.message))
      }
   }
   async getOne(req, res, next) {
      try {
         const { id } = req.params
         const StudentsLesson = await StudentsLessons.findOne({
            where: { id }
         })
         return res.json(StudentsLesson)
      } catch (e) {
         next(ApiError.badRequest(e.message))
      }
   };

   async update(req, res, next) {
      try {
         const { id } = req.body
         const updateStudentsLessons = await StudentsLessons.update(req.body, {
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
         const deleteStudentsLessons = await StudentsLessons.destroy({
            where: { id },
         })
         return res.json(deleteStudentsLessons)
      } catch (e) {
         next(ApiError.badRequest(e.message))
      }
   };

}

module.exports = new StudentLessonsController()

