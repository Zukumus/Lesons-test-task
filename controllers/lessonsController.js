const { Lessons } = require('../models/models');
const ApiError = require('../error/ApiError');
const db = require('../db');


class LessonsController {

    async create(req, res, next) {
        try {
            const { title } = req.body
            const lesson = await Lessons.create({ title })
            return res.json(lesson)
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
            return res.json(lesson)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    };

};


module.exports = new lessonsController()