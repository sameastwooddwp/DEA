function checkErrors (errors) {
  return new Promise((resolve, reject) => {
    for (let v in errors) {
      if (errors[v].message !== false) {
        reject(errors)
        break
      }
    }
    resolve(true)
  })
}

function checkBlank (input) {
  if (input) {
    const valid = input.length > 0
    if (valid) {
      return false
    }
  }
  return 'Cannot be blank'
}

function checkBusinessName (input) {
  const regex = new RegExp(/^[a-zA-Z]{1,60}$/)
  const valid = regex.test(input)
  if (valid) {
    return false
  }
  return 'Business names cannot be longer than 60 characters'
}

function checkAccountNumber (input) {
  const regex = new RegExp(/^[0-9]{6}$|^[0-9]{8}$/)
  const valid = regex.test(input)
  if (valid) {
    return false
  }
  return 'Enter a valid account number'
}

function checkSortCode (input) {
  const regex = new RegExp(/(\d{2}-?){2}\d{2}/)
  const valid = regex.test(input)
  if (valid) {
    return false
  }
  return 'Enter a valid sort code'
}



module.exports = {checkErrors, checkBlank, checkAccountNumber, checkBusinessName, checkSortCode}
