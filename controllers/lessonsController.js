const { Lessons, Students, Teachers } = require('../models/models');
const ApiError = require('../error/ApiError');
const db = require('../db');


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
            const type = await Lessons.findOne({
                where: { id },
                include: [Students, Teachers],
            })
            return res.json(type)
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