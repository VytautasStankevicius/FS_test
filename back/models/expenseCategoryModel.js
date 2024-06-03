const mongoose = require('mongoose') 

const { Schema } = mongoose;

const expenseCategorySchema = new Schema({
    title: {
        type: String,
        required: true
    },
});



const ExpenseCategory = mongoose.model('ExpenseCategory', expenseCategorySchema)

module.exports = ExpenseCategory