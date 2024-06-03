const express = require('express')
const router = express.Router()
const expenseController = require('../controllers/expenceController')
const {authToken} = require('../middleware/authToken')


router.route('/')
.post( 
    authToken, expenseController.createExpense
)

.get(
    authToken, expenseController.getExpenses 
)

router.route('/:id')
.delete(
    authToken, expenseController.deleteExpense
)
.patch(
    authToken, expenseController.updateExpenses
)

.get(
    authToken, expenseController.getExpense
)


module.exports = router