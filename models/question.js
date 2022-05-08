const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Question extends Model { }

Question.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        question_text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        question_answer: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        category_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "category",
                key: 'id'
            }
        },
        account_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "account",
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'question',
    }
);

module.exports = Question;