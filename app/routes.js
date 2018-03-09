const express = require('express')
const router = express.Router()
const {checkErrors, checkBlank, checkAccountNumber, checkBusinessName, checkSortCode} = require('./functions')

router.use((req, res, next) => {
  delete req.session.data.errors
  next()
})

// Route index page
router.get('/', function (req, res) {
  res.render('index')
})

router.post('/craigsexample', function (req, res) {
  validateFields(
    isNotBlank(req, 'name'),
    isValidNino(req, 'nino')
  )
  .then(() => {
    res.redirect('/ok')
  })
  .catch(() => {
    res.redirect('/')
  })
})

// router.post('/check-list', function (req, res) {
//   validateFields(
//     isValidAccountNumber(req, 'account-number')
//   )
//   .then(() => {
//     res.redirect('/check-list')
//   })
//   .catch(() => {
//     res.redirect('/bank-details')
//   })
// })

router.post('/check-list', (req, res) => {
  const errors = {
    'sort-code': {
      label: 'Sort code',
      message: checkBlank(req.body['sort-code']) || checkSortCode(req.body['sort-code'])
    },
    'account-number': {
      label: 'Account number',
      message: checkBlank(req.body['account-number']) || checkAccountNumber(req.body['account-number'])
    }
  }

  checkErrors(errors)
  .then(() => {
    res.redirect('/check-list')
  })
  .catch(errors => {
    res.render('bank-details', {errors})
  })
})





router.post('/contact-details', (req, res) => {
  const errors = {
    'business-name': {
      label: 'Business name',
      message: checkBlank(req.body['business-name']) || checkBusinessName(req.body['business-name'])
    }
  }

  checkErrors(errors)
  .then(() => {
    res.redirect('/contact-details')
  })
  .catch(errors => {
    res.render('business-name', {errors})
  })
})

// Add your routes here - above the module.exports line

module.exports = router
