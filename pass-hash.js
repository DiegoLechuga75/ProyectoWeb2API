const bcrypt = require('bcrypt');

const hashPassword = async (rawPassword) => {
    return await bcrypt.hash(rawPassword, 10);
}

module.exports = { hashPassword }