const Category = require('../models/expenseCategoryModel')

const mongoose = require('mongoose')


exports.createExpenseCategories = async (req, res) => {

	if (!req?.body?.title) {
		return res.status(400).json({ 'message': 'Missing title' })
	}

	try {
		const result = await Category.create({
			title: req.body.title,
		})

        const resultExp = await Category.find()

		res.status(201).json(resultExp)
	} catch (error) {
		console.error(error)
	}
}

exports.getExpenseCategories = async (req, res) => {
	const result = await Category.find()

	if (result == null) {
		return res.sendStatus(404)
	}

	return res.json({ data: result })
}

exports.deleteExpenseCategories = async (req, res) => {
	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		return res.sendStatus(404)
	}

	const result = await Category.findByIdAndDelete(req.params.id)

	return res.status(201).json({
        status: 'success'})
}

exports.updateExpenseCategories = async(req, res)=>{
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		return res.sendStatus(404)
	}
    const result = await Category.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    })

    return res.status(201).json({
        status: 'success',
        data: result
    })




}