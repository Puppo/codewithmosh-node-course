const bcrypt = require('bcrypt');

async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt)
}

async function comparePassword(password1, password2) {
    return await bcrypt.compare(password1, password2)
}

module.exports = {
    hash: hashPassword,
    compare: comparePassword
}