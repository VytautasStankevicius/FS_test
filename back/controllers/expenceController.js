const Expense = require('../models/expenseModel')
const jwt = require('jsonwebtoken')
const expenseCategory = require('../models/expenseCategoryModel')
const mongoose = require('mongoose')


exports.createExpense = async (req, res) => {
	if (!req?.body?.kind) {
		return res.status(400).json({ 'message': 'Missing kind' })
	}
	if (!req?.body?.amount) {
		return res.status(400).json({ 'message': 'Missing amount' })
	}
	if (!req?.body?.time) {
		return res.status(400).json({ 'message': 'Missing time' })
	}
	if (!req?.body?.expense_category) {
		return res.status(400).json({ 'message': 'Missing expense_category' })
	}

	try {
		const result = await Expense.create({
			kind: req.body.kind,
			amount: req.body.amount,
			time: req.body.time,
			user_id: req.user._id,
			expense_category: req.body.expense_category,
		})

        const resultExp = await Expense.find()

		res.status(201).json(result)
	} catch (error) {
		console.error(error)
	}
}

exports.getExpenses = async (req, res) => {
	const result = await Expense.find({ user_id: req.user._id })

	if (result == null) {
		return res.sendStatus(404)
	}

	return res.status(200).json({ data: result })
}


exports.deleteExpense = async (req, res) => {
	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		return res.sendStatus(404)
	}
   

	const result = await Expense.findById(req.params.id)
		if (!result) {
			return res.sendStatus(404)
		}
    if(result.user_id.toString() === req.user._id.toString()){
        result.deleteOne()
    }
    const resultExp = await Expense.find()

	return res.status(200).json(resultExp)
}

exports.updateExpenses = async (req, res)=>{
	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		return res.sendStatus(404)
	}
	console.log(req.params.id)
	const result = await Expense.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,

    })

	
	return res.status(201).json({
        status: 'success',
        data: result
    })

}

exports.getExpense = async (req, res)=>{
	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		return res.sendStatus(404)
	}
	console.log(req.params.id)
	const result = await Expense.findOne({_id:req.params.id})
	if (!result) {
		return res.sendStatus(404)
	}
	
	return res.status(201).json({
        status: 'success',
        data: result
    })

}