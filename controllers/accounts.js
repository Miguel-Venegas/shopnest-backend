const {encryptPassword, comparePasswords} = require('../utils/hash');
const Account = require('../models/Account');


exports.getAllAccounts = async (req, res) => {
    const accounts = await Account.find();
    res.json(accounts);
};

exports.createAccount = async (req, res) => {
    console.log(req.body);
    const account = await Account.create(req.body);
    res.json(account);
};

exports.updateAccount = async (req, res) => {
    const account = await Account.findByIdAndUpdate(req.params.id, req.body, { new: true }, {runValidators: true});
    res.json(account);
};

exports.deleteAccount = async (req, res) => {
    await Account.findByIdAndDelete(req.params.id);
    res.send('deleted');
};

exports.signup = async (req, res) => {

    const { email, password, firstName, lastName, businessName } = req.body;

    const existing = await Account.findOne({ email });

    if (existing) {
        return res.status(400).send("Email is already in use");
    }
    
    const encryptedPassword = await encryptPassword(password);

    const account = await Account.create({ 
        email, 
        password: encryptedPassword,
        firstName,
        lastName,
        businessName
    });

    req.session.userId = account.id;

    res.json(account);
};

exports.signout = (req, res) => {
    req.session = null;

    res.send('logged out');
};


exports.signin = async (req, res) => {
    const { email, password } = req.body;

    const user = await Account.findOne({ email });

    if (!user) {
        return res.status(404).json({ error: "No account associated with this email" });
    }

    const isValidPassword = await comparePasswords(password, user.password);

    if (!isValidPassword) {
        return res.status(401).json({ error: "Password is incorrect" });
    }

    // password is correct
    req.session.userId = user.id;

    return res.json({
        message: "You are signed in",
        user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            businessName: user.businessName,
        }
    });
};
