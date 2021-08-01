const { Lessons, Students, Teachers, TeachersLessons, StudentsLessons } = require('../models/models');
const ApiError = require('../error/ApiError');
const db = require('../db');
const { model } = require('../db');


class LessonsController {

    async create(req, res, next) {
        try {
            const { title, firstDate, lastDate } = req.body
            const lesson = await Lessons.create({ title, firstDate, lastDate, })
            return res.json(lesson)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    };
    async findAll(req, res, next) {
        try {
            let { page, limit, } = req.query
            page = page || 1
            limit = limit || 5
            let offset = page * limit - limit
            const lessons = await Lessons.findAndCountAll({ page, limit, })
            return res.json(lessons)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    };

    async getOne(req, res, next) {
        try {
            const { id } = req.params
            const lesson = await Lessons.findOne({
                where: { id },
                attributes: ['id', 'title', 'firstDate', 'lastDate'],
                include: {
                    model: TeachersLessons,
                    attributes: ['dateLesson', 'daysLessons', 'lessonsCount', 'teacherId', 'lessonId', 'status'],
                    include: [{
                        model: Students,
                        attributes: ['id', 'name',],
                        StudentsLessons,
                        through: { attributes: ['teachersLessonId', 'visit'] },
                    },
                        Teachers,
                    ]
                }
            });
            let visitData = [...lesson.teachersLessons[0].students]
            let countVisitTrue = visitData.filter(visit => visit.studentLessons.visit === true)

            return res.json({
                'countVisitTrue': countVisitTrue.length,
                'countVisit': visitData.length,
                'infoLesson': lesson,
            })
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    };

    async update(req, res, next) {
        try {
            const { id } = req.body
            const updateLesson = await Lessons.update(req.body, {
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
            const deleteLessons = await Lessons.destroy({
                where: { id },
            })
            return res.json(deleteLessons)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    };

};


module.exports = new LessonsController()