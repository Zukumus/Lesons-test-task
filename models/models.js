const sequelize = require('../db');
const { DataTypes, DATE } = require('sequelize');

const Lessons = sequelize.define('lessons', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, unique: false, allowNull: false },
    firstDate: { type: DataTypes.DATEONLY, allowNull: true },
    lastDate: { type: DataTypes.DATEONLY, allowNull: true },
    status: { type: DataTypes.INTEGER, defaultValue: 0 },
});

const Students = sequelize.define('students', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: false, allowNull: false },
    // date: { type: DataTypes.STRING,  },
});

const Teachers = sequelize.define('teachers', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false }
});

// Student - Lesson uniqueKey: false 
Students.hasOne(Lessons, { foreignKey: 'studentId', });
Lessons.belongsTo(Students, { foreignKey: 'studentId', });

// Teacher - Lesson
Teachers.hasOne(Lessons, { foreignKey: 'teacherId' });
Lessons.belongsTo(Teachers, { foreignKey: 'teacherId' });
// const LessonsStudents = sequelize.define('lessonsStudents', {
//     LessonsId: {
//         type: DataTypes.INTEGER,
//         references: {
//             model: Lessons,
//             key: 'id'
//         }
//     },
//     StudentsID: {
//         type: DataTypes.INTEGER,
//         references: {
//             model: Students,
//             key: 'id'
//         }
//     }
// });
// const LessonsTeachers = sequelize.define('lessonsTeachers', {
//     LessonsId: {
//         type: DataTypes.INTEGER,
//         references: {
//             model: Lessons,
//             key: 'id'
//         }
//     },
//     StudentsID: {
//         type: DataTypes.INTEGER,
//         references: {
//             model: Teachers,
//             key: 'id'
//         }
//     }
// });





// const LessonsTeachers = sequelize.define('lessons_teachers', {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
// });





// const StudentsTeachers = sequelize.define('student_teachers', {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
// });

// Student - Teacher
// Students.belongsToMany(Teachers, { through: StudentsTeachers });
// Teachers.belongsToMany(Students, { through: StudentsTeachers });



module.exports = {
    Lessons,
    Teachers,
    Students,
    // LessonsTeachers,
    // LessonsStudents,
    // StudentsTeachers,
};