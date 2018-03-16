const express = require('express')
const router = express.Router()
const {checkErrors, checkBlank, checkAccountNumber, checkBusinessName, checkSortCode, checkEmail} = require('./functions')

router.use((req, res, next) => {
  delete req.session.data.errors
  next()
})

// Route index page
router.get('/', function (req, res) {
  res.render('index')
})





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
      label: 'Employer name',
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






router.post('/bank-details', (req, res) => {
  const errors = {
    'contact-name': {
      label: 'Full name',
      message: checkBlank(req.body['contact-name'])
    },
    'email': {
      label: 'Email address',
      message: checkBlank(req.body['email']) || checkEmail(req.body['email'])
    },
    'phone': {
      label: 'Phone number',
      message: checkBlank(req.body['phone'])
    }
  }

  checkErrors(errors)
  .then(() => {
    res.redirect('/bank-details')
  })
  .catch(errors => {
    res.render('contact-details', {errors})
  })
})

// Add your routes here - above the module.exports line

module.exports = router
