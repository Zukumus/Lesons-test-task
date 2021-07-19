const { Students, Lessons } = require('../models/models');
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
            const type = await Students.findOne({
                where: { id },
                include: [Lessons]
            })
            return res.json(type)
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
            const deleteStudent = await Device.destroy({
                where: { id },
            })
            return res.json(deleteStudent)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    };


};

module.exports = new StudentsController()