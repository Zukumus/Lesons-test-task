const { Students } = require('../models/models');
const ApiError = require('../error/ApiError');

class StudentsController {

    async create(req, res, next) {
        try {
            const { title } = req.body
            const student = await Lessons.create({ title })
            return res.json(lesson)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    };
    async update(req, res, next) {
        try {
            const { id } = req.body
            const updateStudent = await Lessons.update(req.body, {
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

module.exports = new studentsController()