const express = require('express');
const router = express.Router();

const { validateSignup } = require('../../middleware/validators/accountValidators');
const { validateSignin } = require('../../middleware/validators/accountValidators');
const { handleValidation } = require('../../middleware/validation');
const { authLimiter } = require('../../middleware/rateLimiters');

const {
    getAllAccounts,
    createAccount,
    updateAccount,
    deleteAccount,
    signup,
    signout,
    signin
} = require('../../controllers/accounts');


router.post('/signup', validateSignup, authLimiter, handleValidation, signup);

router.get('/signout', signout);

router.post('/signin', validateSignin, authLimiter, handleValidation, signin);

router.get('/', getAllAccounts);

router.post('/test', createAccount);

router.delete('/:id', deleteAccount);

router.put('/:id', updateAccount);

module.exports = router;
