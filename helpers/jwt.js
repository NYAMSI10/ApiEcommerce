var { expressjwt: jwt } = require("express-jwt");

function authJwt() {
    const secret = "bb";


    return jwt({
        secret:secret,
        algorithms: ["HS256"]
    })

}




module.exports = authJwt;

