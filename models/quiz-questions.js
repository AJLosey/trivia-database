const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class QuizQuestion extends Model { }

QuizQuestion.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        quiz_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "quiz",
                key: 'id'
            }
        },
        question_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "question",
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'quiz-question',
    }
);

module.exports = QuizQuestion;