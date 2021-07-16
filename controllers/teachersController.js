const { Teachers } = require('../models/models');
const ApiError = require('../error/ApiError');

class TeacherController {

    async create(req, res, next) {
        try {
            const { name } = req.body
            const teacher = await Lessons.create({ title })
            return res.json(teacher)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    };
    async update(req, res, next) {
        try {
            const { id } = req.body
            const updateTeacher = await Lessons.update(req.body, {
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
            const deleteTeacher = await Device.destroy({
                where: { id },
            })
            return res.json(deleteTeacher)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    };


};

module.exports = new teacherController()