const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Quiz extends Model { }

Quiz.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        quiz_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        quiz_description: {
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
        modelName: 'quiz',
    }
);

module.exports = Quiz;