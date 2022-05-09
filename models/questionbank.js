const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class QuestionBank extends Model { }

QuestionBank.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        categoryid: {
            type: DataTypes.INTEGER,
            // references: {
            //     model: "Category",
            //     key: 'id'
            // }
        },
        questiontype: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        difficulty: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        question: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        correct_answer: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        incorrect_answers: {
            type: DataTypes.JSON,
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'questionbank',
    }
);

module.exports = QuestionBank;