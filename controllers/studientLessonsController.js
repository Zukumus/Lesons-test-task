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



}

module.exports = new StudentLessonsController()

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