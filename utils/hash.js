const crypto = require('crypto');
const util = require('util');
const scrypt = util.promisify(crypto.scrypt);


const encryptPassword = async (password) =>  {

    const salt = crypto.randomBytes(8).toString('hex');
    const buffer = await scrypt(password, salt, 64);
    const hashed = buffer.toString('hex');

    return `${hashed}.${salt}`;
};

const comparePasswords = async (supplied, saved) => {

    const [hash, salt] = saved.split('.');

    const buffer = await scrypt(supplied, salt, 64);

    const hashSupplied = buffer.toString('hex');
    
    return hashSupplied === hash;
};

module.exports =  { encryptPassword, comparePasswords };