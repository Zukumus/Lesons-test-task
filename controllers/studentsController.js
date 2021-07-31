const { Lessons, Students, Teachers, TeachersLessons, StudentsLessons } = require('../models/models');
const ApiError = require('../error/ApiError');

class StudentsController {

    async create(req, res, next) {
        try {
            const { name, lessonsId } = req.body
            const student = await Students.create({ name, lessonsId })
            return res.json(student)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    };
    async findAll(req, res, next) {
        try {
            const students = await Students.findAll()
            return res.json(students)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    };
    async getOne(req, res, next) {
        try {
            const { id } = req.params
            const student = await Students.findOne({
                where: { id },
                attributes: ['id', 'name'],
                include: {
                    model: TeachersLessons,
                    attributes: ['dateLesson', 'daysLessons', 'lessonsCount', 'teacherId', 'lessonId', 'status'],
                    include: [{
                        model: Teachers,
                        attributes: ['id', 'name',],
                        StudentsLessons,
                    },
                        Lessons,
                    ]
                }
            });
            return res.json(student)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    };


    async update(req, res, next) {
        try {
            const { id } = req.body
            const updateStudent = await Students.update(req.body, {
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
            const deleteStudent = await Students.destroy({
                where: { id },
            })
            return res.json(deleteStudent)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    };


};

module.exports = new StudentsController()