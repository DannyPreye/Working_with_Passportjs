const crypto = require("crypto");

function validPassport(password, hash, salt) {
    const hashVerify = crypto
        .pbkdf2Sync(password, salt, 100000, 64, "sha512")
        .toString("hex");
    return hash === hashVerify;
}
function genPassword(password) {
    const salt = crypto.randomBytes(32).toString("hex");
    const hash = crypto
        .pbkdf2Sync(password, salt, 100000, 64, "sha512")
        .toString("hex");

    return {
        salt,
        hash,
    };
}

module.exports.validPassword = validPassport;
module.exports.genPassword = genPassword;
