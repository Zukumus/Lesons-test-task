const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const Lessons = sequelize.define('lessons', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, },
    date: { type: DataTypes.STRING },
    status: { type: DataTypes.BOOLEAN, defaultValue: true },
});

const Teachers = sequelize.define('teachers', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false }
});
const Students = sequelize.define('students', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    visit: { type: DataTypes.BOOLEAN, defaultValue: true },
});

const LessonsTeachers = sequelize.define('lessons_teachers', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})
const LessonsStudents = sequelize.define('lessons_students', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

Students.hasOne(Lessons);
Lessons.belongsTo(Lessons);

Teachers.belongsToMany(Lessons, { through: LessonsTeachers });
Lessons.belongsToMany(Teachers, { through: LessonsTeachers });


module.exports = {
    Lessons,
    Teachers,
    Students,
    LessonsTeachers
};