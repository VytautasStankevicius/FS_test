const mongoose = require('mongoose') 

const { Schema } = mongoose;

const expenseSchema = new Schema({
    kind: {
        type: String, 
        enum:["income", "expense"],
        required: true,
    },
	amount: {
        type: Number,
        required: true
    },
	time: {
        type: Date,
        required: true
    },
	user_id: {
        type: Schema.Types.ObjectId,
		ref: 'User',
        required: true
    },
    expense_category: {
        type: Schema.Types.ObjectId,
        ref: 'ExpenseCategory',
        required: true
    },
});



const Expense = mongoose.model('Expense', expenseSchema)

module.exports = Expense