const bcrypt = require('bcrypt');

const verifyPassword = async (hash, password) => {
    return await bcrypt.compare(password, hash);
}

module.exports = { verifyPassword }