const { Lessons, Students, Teachers, TeachersLessons, InformationSchool } = require('../models/models');
const ApiError = require('../error/ApiError');


class TeacherLessonsController {

   async Create(req, res, next) {
      try {
         const { lessonId, dateLesson, lessonsCount } = req.body
         const lesson = await Lessons.findByPk(lessonId)
         let lessonTeacher;
         if (lesson.id == lessonId && dateLesson <= lesson.lastDate) {
            const { lessonId, teacherId, daysLessons, dateLesson, lessonsCount } = req.body;
            lessonTeacher = await TeachersLessons.create({ lessonId, teacherId, daysLessons, dateLesson, lessonsCount });
         } else {
            next(ApiError.badRequest('you cannot create a lesson after the last date of the lesson'))
         }
         return res.json(lessonTeacher)
      } catch (e) {
         next(ApiError.badRequest(e.message))

      }
   }
   async findAll(req, res, next) {
      try {
         const teachersLessons = await TeachersLessons.findAll()
         return res.json(teachersLessons)
      } catch (e) {
         next(ApiError.badRequest(e.message))
      }
   };
   async getOne(req, res, next) {
      try {
         const { id } = req.params
         const teacherLesson = await TeachersLessons.findOne({
            where: { id },
         })
         return res.json(teacherLesson)
      } catch (e) {
         next(ApiError.badRequest(e.message))
      }
   };

   async update(req, res, next) {
      try {
         const { id } = req.body
         const updateTeacherLesson = await TeachersLessons.update(req.body, {
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
         const deleteTeachersLessons = await TeachersLessons.destroy({
            where: { id },
         })
         return res.json(deleteTeachersLessons)
      } catch (e) {
         next(ApiError.badRequest(e.message))
      }
   };

}



module.exports = new TeacherLessonsController()
