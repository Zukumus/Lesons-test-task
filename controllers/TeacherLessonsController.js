const { Lessons, Students, Teachers, TeachersLessons, InformationSchool } = require('../models/models');
const ApiError = require('../error/ApiError');


class TeacherLessonsController {

   async Create(req, res, next) {
      try {
         const { lessonId, dateLesson } = req.body
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

}



module.exports = new TeacherLessonsController()

// function countStudents(req, res, next) {
//    try {
//       let { id, visit, recorded, date, title, status, students } = req.body
//       let lesson = await Lessons.findOne({ id })
//       infoLesson = []
//       let studentVisit = ({ visit, recorded })
//       if (studentVisit.recorded === true) {
//          let countVisitStudents = studentVisit.map(studentVisit => studentVisit.visit)// not work
//          if (students.visit === true) {
//             let countVisitStudents = studentVisit.map(studentVisit => studentVisit.visit)
//             return res.json(studentVisit, countVisitStudents)
//          }
//       }

//    } catch (e) {
//       next(ApiError.badRequest(e.message))
//    }
// }


//     async getAll(req, res, next) {
//             try {
//                 let { lessonId, studentId, teacherId, page, limit } = req.query
//                 page = page || 1
//                 limit = limit || 5
//                 let offset = page * limit - limit
//                 let infoLessons;
//                 if (!lessonId && !studentId && !teacherId) {
//                     infoLessons = await Lessons.findAndCountAll({ limit, offset })
//                 } else if (typeId && !brandId) {
//                     infoLessons = await Device.findAndCountAll({ where: { typeId }, limit, offset })
//                 } else if (brandId && !typeId) {
//                     infoLessons = await Device.findAndCountAll({ where: { brandId }, limit, offset })
//                 } else if (brandId && typeId) {
//                     infoLessons = await Device.findAndCountAll({ where: { brandId, typeId }, limit, offset })
//                 }
//                 return res.json(infoLessons)
//             } catch (e) {
//                 next(ApiError.badRequest(e.message))
//             }
//     }