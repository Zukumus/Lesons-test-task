const { Lessons, Students, Teachers } = require('../models/models');
const ApiError = require('../error/ApiError');

class InfoLessonsController {

    async getAll(req, res, next) {
            try {
                let { lesson, student, teacher } = req.query
                page = page || 1
                limit = limit || 5
                let offset = page * limit - limit
                let infoLessons;
                if (!brandId && !typeId) {
                    devices = await Device.findAndCountAll({ limit, offset })
                } else if (typeId && !brandId) {
                    devices = await Device.findAndCountAll({ where: { typeId }, limit, offset })
                } else if (brandId && !typeId) {
                    devices = await Device.findAndCountAll({ where: { brandId }, limit, offset })
                } else if (brandId && typeId) {
                    devices = await Device.findAndCountAll({ where: { brandId, typeId }, limit, offset })
                }
                return res.json(lesson)
            } catch (e) {
                next(ApiError.badRequest(e.message))
            }


            module.exports = new infoLessonsController()