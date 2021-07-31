const { Lessons, Students, Teachers, TeachersLessons, StudentsLessons } = require('../models/models');
const ApiError = require('../error/ApiError');
const db = require('../db');
const { model } = require('../db');


class LessonsController {

    async create(req, res, next) {
        try {
            const { title, firstDate, lastDate, studentId, teacherId } = req.body
            const lesson = await Lessons.create({ title, firstDate, lastDate, studentId, teacherId })
            return res.json(lesson)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    };
    async findAll(req, res, next) {
        try {
            const lessons = await Lessons.findAndCountAll()
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
                        // attributes: {
                        //     include: [[Sequelize.fn("COUNT", Sequelize.col("informationSchools.visit")), "sensorCount"]]
                        // },
                    },
                        Teachers,
                        // attributes: ['visit'],

                        // through: { attributes: ['visit'] },

                    ]
                }
            });
            // const data = [...'sss'.split(' '), lesson]
            // const countLessens = lesson
            const countLessens = [...lesson.teachersLessons[0].students]
            let data = countLessens.reduce(function (visit = 0, item.informationSchool.visit === true) { visit + item.informationSchool.visit === true
        }, 0)
        return res.json(data)
        // return res.json(lesson.teachersLessons[0].students[0].informationSchools)
    } catch(e) {
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

async delete (req, res, next) {
    try {
        const { id } = req.params
        const deleteLesson = await Device.destroy({
            where: { id },
        })
        return res.json(deleteLesson)
    } catch (e) {
        next(ApiError.badRequest(e.message))
    }
};

};


module.exports = new LessonsController()