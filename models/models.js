const sequelize = require('../db');
const { DataTypes, DATE } = require('sequelize');

const Lessons = sequelize.define('lessons', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, unique: false, allowNull: false },
    firstDate: { type: DataTypes.DATEONLY, allowNull: true },
    lastDate: { type: DataTypes.DATEONLY, allowNull: true },
});

const Students = sequelize.define('students', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: false, allowNull: false },
});

const Teachers = sequelize.define('teachers', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false }
});

const TeachersLessons = sequelize.define('teachersLessons', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    daysLessons: { type: DataTypes.STRING, allowNull: true },
    dateLesson: { type: DataTypes.DATEONLY, allowNull: true },
    lessonsCount: { type: DataTypes.INTEGER, allowNull: true },
    status: { type: DataTypes.INTEGER, defaultValue: 0 },
})
const StudentsLessons = sequelize.define('studentLessons', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    visit: { type: DataTypes.BOOLEAN, allowNull: true },
})


//creating a connection between models many to many. Teacher Lesson
Teachers.belongsToMany(Lessons, { through: TeachersLessons });
Lessons.belongsToMany(Teachers, { through: TeachersLessons });
TeachersLessons.belongsTo(Lessons);
TeachersLessons.belongsTo(Teachers);
Lessons.hasMany(TeachersLessons);
Teachers.hasMany(TeachersLessons);

//creating a connection between models many to many. Student Teacher through model TeachersLessons
Students.belongsToMany(TeachersLessons, { through: StudentsLessons });
TeachersLessons.belongsToMany(Students, { through: StudentsLessons });
StudentsLessons.belongsTo(Students);
StudentsLessons.belongsTo(TeachersLessons);
Students.hasMany(StudentsLessons);
TeachersLessons.hasMany(StudentsLessons);
//

module.exports = {
    Lessons,
    Teachers,
    Students,
    StudentsLessons,
    TeachersLessons
};