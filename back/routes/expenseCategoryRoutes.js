const express = require('express')

const router = express.Router()
const {authToken} = require('../middleware/authToken')
const {restrictTo} = require('../middleware/restrictTo')
const expennseCategoryController = require('../controllers/expenceCategoryController')



router.post('/', 
    authToken, restrictTo('admin'), expennseCategoryController.createExpenseCategories
)
.get('/', 
authToken, expennseCategoryController.getExpenseCategories)

router.route('/:id')
.delete( 
    authToken,  restrictTo('admin'), expennseCategoryController.deleteExpenseCategories
)
.patch(
    authToken, restrictTo('admin'), expennseCategoryController.updateExpenseCategories
)




module.exports = router