const Account = require("./account");
const Category = require("./category");
const Question = require("./question");
const QuizQuestion = require("./quiz-questions");
const Quiz = require("./quiz");


Question.belongsTo(Account, {
    foreignKey: 'account_id'
});

Question.belongsTo(Category, {
    foreignKey: 'category_id',
    onDelete: 'CASCADE'
});

Quiz.belongsTo(Account, {
    foreignKey: 'account_id'
});

Quiz.belongsTo(Category, {
    foreignKey: 'category_id',
    onDelete: 'CASCADE'
});

Account.hasMany(Question, {
    foreignKey: 'account_id'
});

Account.hasMany(Quiz, {
    foreignKey: 'account_id'
});

Category.hasMany(Question, {
    foreignKey: 'account_id'
});

Category.hasMany(Quiz, {
    foreignKey: 'account_id'
});

Question.belongsToMany(Quiz, {
    through: QuizQuestion,
    foreignKey: 'question_id'
});

Quiz.belongsToMany(Question, {
    through: QuizQuestion,
    foreignKey: 'quiz_id'
});

// new added
Question.hasMany(QuizQuestion, {
    foreignKey: 'question_id'
});


module.exports = { Account, Category, Question, QuizQuestion, Quiz, QuestionBank };
