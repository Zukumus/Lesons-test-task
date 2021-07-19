// const { Lessons, Students, Teachers } = require('../models/models');
// const ApiError = require('../error/ApiError');

const { Lessons } = require("../models/models");

// class InfoLessonsController {

function countStudents(req, res, next) {
   try {
      let { id, visit, recorded, date, title, status, students } = req.body
      let lesson = await Lessons.findOne({ id })
      infoLesson = []
      let studentVisit = ({ visit, recorded })
      if (studentVisit.recorded === true) {
         let countVisitStudents = studentVisit.map(studentVisit => studentVisit.visit)// not work
         if (students.visit === true) {
            let countVisitStudents = studentVisit.map(studentVisit => studentVisit.visit)
            return res.json(studentVisit, countVisitStudents)
         }
      }

   } catch (e) {
      next(ApiError.badRequest(e.message))
   }
}


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
// }

//             module.exports = new InfoLessonsController()